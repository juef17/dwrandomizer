#!/bin/bash -e 

echo -n "Compiling... "

"/home/francois/Documents/Perm stuff/Software/dwr_compilation/asm6f" -q -m -f -dDEBUG credits.asm credits.nes

echo "Done."

