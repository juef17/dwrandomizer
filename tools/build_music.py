#!/usr/bin/env python

from glob import glob
from subprocess import run
from os.path import dirname, basename, realpath, join, exists
from os import chdir, remove, getcwd
from distutils.spawn import find_executable

MUSIC_ADDR = 0x8000

class Music:
    def __init__(self, name):
        self.filename = name
        self.name = name[:name.rfind('.')]
        print(f'Adding music {self.name}...')
        self.asm6 = "/home/francois/Documents/Autres/2024.1 - Hiver/Dragon Warrior Randomizer/Programming/unofficial_juef_version/tools/asm6f"#find_executable('asm6f') or find_executable('asm6')
        print(self.asm6)
        self.famistudio = "/home/francois/Documents/Perm stuff/Software/FamiStudio/FamiStudio.dll"#find_executable('famistudio')
        #self.famistudio = "/home/francois/Documents/Perm stuff/Software/FamiStudio413-LinuxAMD64/FamiStudio.dll"#find_executable('famistudio')
        self.music = self.dmc = b''
        self.addr = None
        self.assemble()

    def generate_asm(self):
        print('Generating assembly...')
        #run([self.famistudio, f'{self.filename}',  'famistudio-asm-export',
        run(["dotnet", f'{self.famistudio}', f'{self.filename}',  'famistudio-asm-export',
            f'_{self.name}.asm', '-famistudio-asm-format:asm6'])

    def cleanup(self):
        remove('_m.asm')
        remove(f'_{self.name}.bin')
        remove(f'_{self.name}.asm')
        if exists(f'_{self.name}.dmc'):
            remove(f'_{self.name}.dmc')

    def assemble(self):
        self.generate_asm()
        with open('_m.asm', 'w') as f:
            f.write('FAMISTUDIO_DPCM_PTR EQU $00\n')
            f.write(f'.org ${MUSIC_ADDR:X}\n')
            f.write(f'include _{self.name}.asm\n')
        print('Assembling...')
        if run([self.asm6, '-q', '_m.asm', f'_{self.name}.bin']).returncode:
            exit(-1);
        with open(f'_{self.name}.bin', 'rb') as f:
            self.music = f.read()
        if exists(f'_{self.name}.dmc'):
            with open(f'_{self.name}.dmc', 'rb') as f:
                self.dmc = f.read()
        self.cleanup()

    def set_addr(self, addr):
        self.addr = addr

    def music_size(self):
        return len(self.music)

    def dmc_size(self):
        if self.dmc:
            return len(self.dmc)
        return 0;

    def total_size(self):
        return len(self.music) + len(self.dmc)

    def music_constant(self):
        if self.addr is None:
            raise ValueError(f"No address set for {self.name}")
        return (f"const uint8_t *music_{self.name}_start = "
                f"&music_bytes[{self.addr}];\n")

    def dmc_constant(self):
        if self.dmc:
            return (f"const uint8_t *dmc_{self.name}_start = "
                    f"&music_bytes[{self.addr+self.music_size()}];\n")
        return ''

    def music_struct(self):
        return ("{ .start = music_%s_start, .size = 0x%x }"
                % (self.name, len(self.music)))

    def dmc_struct(self):
        if self.dmc:
             return ("{ .start = dmc_%s_start, .size = 0x%x }"
                 % (self.name, len(self.dmc)))
        else:
            return "{ .start = NULL, .size = 0 }"

    def __bytes__(self):
        return self.music + (self.dmc or b'')

def create_header(music:list[Music]):
    with open('../../common/credit_music.h', 'w') as h:
        h.write(f'/** This file is generated by {basename(__file__)} */\n\n')
        h.write('#ifndef _CREDIT_MUSIC_H\n')
        h.write('#define _CREDIT_MUSIC_H\n\n')
        h.write('#include <stdint.h>\n')
        h.write('#include <stddef.h>\n')
        h.write('#include "dwr_types.h"\n\n')

        h.write('struct music_data {\n')
        h.write('    const uint8_t *start;\n')
        h.write('    const size_t size;\n')
        h.write('};\n\n')
        h.write('void add_music(dw_rom* rom, int track);\n')
        h.write(f'const extern size_t track_count;\n')
        h.write('\n')
        h.write('#endif\n')
        print("Generated header file")

def create_c_file(music:list[Music], music_data):
    with open('../../common/credit_music.c', 'w') as c:
        c.write(f'/** This file is generated by {basename(__file__)} */\n\n')
        c.write('#include <stdint.h>\n')
        c.write('#include <stddef.h>\n')
        c.write('#include "credit_music.h"\n')
        c.write('#include "dwr_types.h"\n')
        c.write('#include "patch.h"\n')
        c.write('\n');
        c.write('static const uint8_t music_bytes[] = {')
        for i,b in enumerate(music_data):
            if i:
                c.write(', ')
            if not i % 12:
                c.write('\n    ')
            c.write(f'0x{b:02x}')
        c.write('\n};\n\n')
        c.write(f'const size_t track_count = {len(music)};\n\n')

        c.write('static void add_dpcm(dw_rom *rom, int track)\n')
        c.write('{\n    ')
        consts = [m.dmc_constant() for m in music if m.dmc_constant()]
        c.write('    '.join([const for const in consts if const]))
        c.write('\n')
        c.write('    struct music_data dmc_choice[] = {\n')
        c.write('        ')
        c.write(',\n        '.join([m.dmc_struct() for m in music]))
        c.write('\n    };\n')
        c.write('    struct music_data *dmc = &dmc_choice[track];\n')
        c.write('    if (dmc->start)\n')
        c.write('        ppatch(&rom->expansion[0x8000], dmc->size, dmc->start);\n')
        c.write('}\n\n')

        c.write('void add_music(dw_rom *rom, int track)\n')
        c.write('{\n    ')
        c.write('    '.join([m.music_constant() for m in music]))
        c.write('\n')
        c.write('    struct music_data music_choice[] = {\n')

        c.write('        ')
        c.write(',\n        '.join([m.music_struct() for m in music]))
        c.write('\n')
        c.write('    };\n')
        c.write('    struct music_data *music = &music_choice[track];\n')
        c.write('    ppatch(&rom->expansion[0x4000], music->size, music->start);\n')
        c.write('    add_dpcm(rom, track);\n')
        c.write('}\n\n')

        print("Generated C file")


def main():
    chdir(join(dirname(realpath(__file__)), '..', 'expansion', 'music'))
    music_names = [x for x in glob('*.txt') + glob('*.fms')]
    music = [Music(m) for m in music_names]
    music_data = b''.join([bytes(m) for m in music])

    addr = 0
    for m in music:
        m.set_addr(addr)
        addr += m.total_size()

    create_c_file(music, music_data)
    create_header(music)

if __name__ == "__main__":
    main()

