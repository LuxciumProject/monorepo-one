#!/usr/bin/env bash

# ❯ stress-ng  --cpu-method help

# cpu-method must be one of: all ackermann apery bitops callfunc cdouble cfloat clongdouble collatz correlate crc16 decimal32 decimal64 decimal128 dither div8 div16 div32 div64 div128 double euler explog factorial fibonacci fft fletcher16 float float32 float64 float80 float128 floatconversion gamma gcd gray hamming hanoi hyperbolic idct int128 int64 int32 int16 int8 int128float int128double int128longdouble int128decimal32 int128decimal64 int128decimal128 int64float int64double int64longdouble int32float int32double int32longdouble intconversion ipv4checksum jmp lfsr32 ln2 logmap longdouble loop matrixprod nsqrt omega parity phi pi prime psi queens rand rand48 rgb sieve stats sqrt trig union zeta

export TIMEOUT=45

# stress-ng  --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method float1

#++ cpu-method must be one of:

## The "zeta" stressor in stress-ng refers to the Riemann Zeta
## function, a function used in complex analysis and number theory.
## The Riemann Zeta function is computationally intensive to
## calculate, especially for large inputs, which makes it a good
## method for generating CPU load.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method zeta
echo -e '#1 zeta completed\n'
echo "#1 zeta completed $(date)" >./stress-testors.txt

## in stress-ng the cpu method ackermann is using the ackermann
## function which is a recursive function that is not tail recursive and
## is used to test the stack handling of the kernel
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method ackermann
echo -e '#2 ackermann completed\n'
echo '#2 ackermann completed' >>./stress-testors.txt

## in stress-ng the cpu method apery is using the apery function which
## is a series that converges to zeta(3) and is used to test the floating
## point performance of the CPU
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method apery
echo -e '#3 apery completed\n'
echo '#3 apery completed' >>./stress-testors.txt

## in stress-ng the cpu method bitops is using the bitops function
## which is a series of bit manipulation operations and is used to test
## the integer performance of the CPU
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method bitops
echo -e '#4 bitops completed\n'
echo '#4 bitops completed' >>./stress-testors.txt

## in stress-ng the cpu method callfunc is using the callfunc function
## which is a series of function calls and is used to test the function
## call performance of the CPU
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method callfunc
echo -e '#5 callfunc completed\n'
echo '#5 callfunc completed' >>./stress-testors.txt

## in stress-ng the cpu method cdouble is using the cdouble function
## which is a series of double precision complex number operations
## and is used to test the double precision complex number
## performance of the CPU
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method cdouble
echo -e '#6 cdouble completed\n'
echo '#6 cdouble completed' >>./stress-testors.txt

## in stress-ng the cpu method cfloat is using the cfloat function
## which is a series of single precision complex number operations
## and is used to test the single precision complex number
## performance of the CPU
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method cfloat
echo -e '#7 cfloat completed\n'
echo '#7 cfloat completed' >>./stress-testors.txt

## in stress-ng the cpu method clongdouble is using the clongdouble
## function which is a series of long double precision complex number
## operations and is used to test the long double precision complex
## number performance of the CPU
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method clongdouble
echo -e '#8 clongdouble completed\n'
echo '#8 clongdouble completed' >>./stress-testors.txt

## in stress-ng the cpu method collatz is using the collatz function
## which is a series of collatz sequence operations and is used to
## test the integer performance of the CPU
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method collatz
echo -e '#9 collatz completed\n'
echo '#9 collatz completed' >>./stress-testors.txt

## in stress-ng the cpu method correlate is leveraging the correlate
## function which is a series of correlate operations and is used to
## test the integer performance of the CPU and is used to test the
## integer performance of the CPU

time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method correlate
echo -e '#10 correlate completed\n'
echo '#10 correlate completed' >>./stress-testors.txt

## in stress-ng the cpu method crc16 is leveraging the crc16 function
## which is a series of crc16 operations and is used to test the
## integer performance of the CPU and is used to test the integer
## performance of the CPU
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method crc16
echo -e '#11 crc16 completed\n'
echo '#11 crc16 completed' >>./stress-testors.txt

## in stress-ng the cpu method decimal32 is leveraging the decimal32
## function which is a series of decimal32 operations and is used to test
## the floating point performance of the CPU
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method decimal32
echo -e '#12 decimal32 completed\n'
echo '#12 decimal32 completed' >>./stress-testors.txt

## in stress-ng the cpu method decimal64 is leveraging the decimal64
## function which is a series of decimal64 operations and is used to test
## the floating point performance of the CPU
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method decimal64
echo -e '#13 decimal64 completed\n'
echo '#13 decimal64 completed' >>./stress-testors.txt

## in stress-ng the cpu method decimal128 is leveraging the decimal128
## function which is a series of decimal128 operations and is used to
## test the floating point performance of the CPU

time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method decimal128
echo -e '#14 decimal128 completed\n'
echo '#14 decimal128 completed' >>./stress-testors.txt

## in stress-ng the cpu method dither is leveraging the dither
## function which is a series of dither operations and is used to
## test the integer performance of the CPU and is used to test the
## integer performance of the CPU
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method dither
echo -e '#15 dither completed\n'
echo '#15 dither completed' >>./stress-testors.txt

## in stress-ng the cpu method div8 is leveraging the div8 function
## which is a series of div8 operations and is used to test the
## integer performance of the CPU

time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method div8
echo -e '#16 div8 completed\n'
echo '#16 div8 completed' >>./stress-testors.txt
## in stress-ng the cpu method div16 is leveraging the div16 function
## which is a series of div16 operations and is used to test the
## integer performance of the CPU

time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method div16
echo -e '#17 div16 completed\n'
echo '#17 div16 completed' >>./stress-testors.txt
# in stress-ng the cpu method div32 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method div32
echo -e '#18 div32 completed\n'
echo '#18 div32 completed' >>./stress-testors.txt
# in stress-ng the cpu method div64 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method div64
echo -e '#19 div64 completed\n'
echo '#19 div64 completed' >>./stress-testors.txt
# in stress-ng the cpu method div128 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method div128
echo -e '#20 div128 completed\n'
echo '#20 div128 completed' >>./stress-testors.txt
# in stress-ng the cpu method double is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method double
echo -e '#21 double completed\n'
echo '#21 double completed' >>./stress-testors.txt
# in stress-ng the cpu method euler is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method euler
echo -e '#22 euler completed\n'
echo '#22 euler completed' >>./stress-testors.txt
# in stress-ng the cpu method explog is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method explog
echo -e '#23 explog completed\n'
echo '#23 explog completed' >>./stress-testors.txt
# in stress-ng the cpu method factorial is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method factorial
echo -e '#24 factorial completed\n'
echo '#24 factorial completed' >>./stress-testors.txt
# in stress-ng the cpu method fibonacci is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method fibonacci
echo -e '#25 fibonacci completed\n'
echo '#25 fibonacci completed' >>./stress-testors.txt
# in stress-ng the cpu method fft is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method fft
echo -e '#26 fft completed\n'
echo '#26 fft completed' >>./stress-testors.txt
# in stress-ng the cpu method fletcher16 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method fletcher16
echo -e '#27 fletcher16 completed\n'
echo '#27 fletcher16 completed' >>./stress-testors.txt
# in stress-ng the cpu method float is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method float
echo -e '#28 float completed\n'
echo '#28 float completed' >>./stress-testors.txt
# in stress-ng the cpu method float32 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method float32
echo -e '#29 float32 completed\n'
echo '#29 float32 completed' >>./stress-testors.txt
# in stress-ng the cpu method float64 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method float64
echo -e '#30 float64 completed\n'
echo '#30 float64 completed' >>./stress-testors.txt
# in stress-ng the cpu method float80 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method float80
echo -e '#31 float80 completed\n'
echo '#31 float80 completed' >>./stress-testors.txt
# in stress-ng the cpu method float128 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method float128
echo -e '#32 float128 completed\n'
echo '#32 float128 completed' >>./stress-testors.txt
# in stress-ng the cpu method floatconversion is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method floatconversion
echo -e '#33 floatconversion completed\n'
echo '#33 floatconversion completed' >>./stress-testors.txt
# in stress-ng the cpu method gamma is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method gamma
echo -e '#34 gamma completed\n'
echo '#34 gamma completed' >>./stress-testors.txt
# in stress-ng the cpu method gcd is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method gcd
echo -e '#35 gcd completed\n'
echo '#35 gcd completed' >>./stress-testors.txt
# in stress-ng the cpu method gray is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method gray
echo -e '#36 gray completed\n'
echo '#36 gray completed' >>./stress-testors.txt
# in stress-ng the cpu method hamming is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method hamming
echo -e '#37 hamming completed\n'
echo '#37 hamming completed' >>./stress-testors.txt
# in stress-ng the cpu method hanoi is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method hanoi
echo -e '#38 hanoi completed\n'
echo '#38 hanoi completed' >>./stress-testors.txt
# in stress-ng the cpu method hyperbolic is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method hyperbolic
echo -e '#39 hyperbolic completed\n'
echo '#39 hyperbolic completed' >>./stress-testors.txt
# in stress-ng the cpu method idct is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method idct
echo -e '#40 idct completed\n'
echo '#40 idct completed' >>./stress-testors.txt
# in stress-ng the cpu method int128 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int128
echo -e '#41 int128 completed\n'
echo '#41 int128 completed' >>./stress-testors.txt
# in stress-ng the cpu method int64 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int64
echo -e '#42 int64 completed\n'
echo '#42 int64 completed' >>./stress-testors.txt
# in stress-ng the cpu method int32 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int32
echo -e '#43 int32 completed\n'
echo '#43 int32 completed' >>./stress-testors.txt
# in stress-ng the cpu method int16 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int16
echo -e '#44 int16 completed\n'
echo '#44 int16 completed' >>./stress-testors.txt
# in stress-ng the cpu method int8 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int8
echo -e '#45 int8 completed\n'
echo '#45 int8 completed' >>./stress-testors.txt
# in stress-ng the cpu method int128float is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int128float
echo -e '#46 int128float completed\n'
echo '#46 int128float completed' >>./stress-testors.txt
# in stress-ng the cpu method int128double is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int128double
echo -e '#47 int128double completed\n'
echo '#47 int128double completed' >>./stress-testors.txt
# in stress-ng the cpu method int128longdouble is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int128longdouble
echo -e '#48 int128longdouble completed\n'
echo '#48 int128longdouble completed' >>./stress-testors.txt
# in stress-ng the cpu method int128decimal32 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int128decimal32
echo -e '#49 int128decimal32 completed\n'
echo '#49 int128decimal32 completed' >>./stress-testors.txt
# in stress-ng the cpu method int128decimal64 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int128decimal64
echo -e '#50 int128decimal64 completed\n'
echo '#50 int128decimal64 completed' >>./stress-testors.txt
# in stress-ng the cpu method int128decimal128 is leveragin
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int128decimal128
echo -e '#51 int128decimal128 completed\n'
echo '#51 int128decimal128 completed' >>./stress-testors.txt

## The "int64float" stressor in stress-ng is used to test the
## performance of the CPU by repeatedly calculating the value of the
## single precision number. This is a computationally intensive
## problem because it uses single precision floating point operations,
## which can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int64float
echo -e '#52 int64float completed\n'
echo '#52 int64float completed' >>./stress-testors.txt

## The "int64double" stressor in stress-ng is used to test the
## performance of the CPU by repeatedly calculating the value of the
## double precision number. This is a computationally intensive
## problem because it uses double precision floating point operations,
## which can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int64double
echo -e '#53 int64double completed\n'
echo '#53 int64double completed' >>./stress-testors.txt

## The "int64longdouble" stressor in stress-ng is used to test the
## performance of the CPU by repeatedly calculating the value of the
## long double precision number. This is a computationally intensive
## problem because it does not have any I/O operations, which can put
## stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int64longdouble
echo -e '#54 int64longdouble completed\n'
echo '#54 int64longdouble completed' >>./stress-testors.txt

## The "int32float" stressor in stress-ng is used to test the
## performance of the CPU by repeatedly calculating the value of the
## single precision number. This is a computationally intensive
## problem because it uses single precision floating point operations,
## which can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int32float
echo -e '#55 int32float completed\n'
echo '#55 int32float completed' >>./stress-testors.txt

## The "int32double" stressor in stress-ng is used to test the
## performance of the CPU by repeatedly calculating the value of the
## double precision number. This is a computationally intensive
## problem because it uses double precision floating point
## operations, which can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int32double
echo -e '#56 int32double completed\n'
echo '#56 int32double completed' >>./stress-testors.txt

## The "int32longdouble" stressor in stress-ng is used to test the
## performance of the CPU by repeatedly calculating the value of the
## long double precision number. This is a computationally intensive
## problem because it does not have any I/O operations, which can put
## stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method int32longdouble
echo -e '#57 int32longdouble completed\n'
echo '#57 int32longdouble completed' >>./stress-testors.txt

## The "intconversion" stressor in stress-ng is used to test the
## performance of the CPU by repeatedly converting between integer
## types. This is a computationally intensive problem, which can put
## stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method intconversion
echo -e '#58 intconversion completed\n'
echo '#58 intconversion completed' >>./stress-testors.txt

## The "ipv4checksum" stressor in stress-ng is used to test the
## performance of the CPU by repeatedly calculating the value of the
## IPv4 checksum. This is a computationally intensive problem, which
## is doing a lot of 16-bit addition and can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method ipv4checksum
echo -e '#59 ipv4checksum completed\n'
echo '#59 ipv4checksum completed' >>./stress-testors.txt

## The "jmp" stressor in stress-ng is used to test the performance of
## the CPU by repeatedly executing a jump instruction. This is a
## computationally intensive problem because it does not have any I/O
## operations, which can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method jmp
echo -e '#60 jmp completed\n'
echo '#60 jmp completed' >>./stress-testors.txt

## The "lfsr32" stressor in stress-ng is used to test the performance
## of the CPU by repeatedly calculating the value of a 32-bit linear
## feedback shift register. This is a computationally intensive
## problem, which can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method lfsr32
echo -e '#61 lfsr32 completed\n'
echo '#61 lfsr32 completed' >>./stress-testors.txt

## The "ln2" stressor in stress-ng is used to test the performance of
## the CPU by repeatedly calculating the value of the natural
## logarithm of 2. This is a computationally intensive problem, which
## can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method ln2
echo -e '#62 ln2 completed\n'
echo '#62 ln2 completed' >>./stress-testors.txt

## The "logmap" stressor in stress-ng is used to test the performance
## of the CPU by repeatedly calculating the value of the logistic map.
## This is a computationally intensive problem, which can put stress
## on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method logmap
echo -e '#63 logmap completed\n'
echo '#63 logmap completed' >>./stress-testors.txt

## The "longdouble" stressor in stress-ng is used to test the
## performance of the CPU by repeatedly calculating the value of the
## long double precision number. This is a computationally intensive
## problem, which can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method longdouble
echo -e '#64 longdouble completed\n'
echo '#64 longdouble completed' >>./stress-testors.txt

## The "loop" stressor in stress-ng is used to test the performance
## of the CPU by repeatedly executing a tight loop. This is a
## computationally intensive problem because it does not have any
## I/O operations, which can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method loop
echo -e '#65 loop completed\n'
echo '#65 loop completed' >>./stress-testors.txt

## The "matrixprod" stressor in stress-ng is used to test the
## performance of the CPU by repeatedly calculating the product of
## two matrices. This is a computationally intensive problem, which
## can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method matrixprod
echo -e '#66 matrixprod completed\n'
echo '#66 matrixprod completed' >>./stress-testors.txt

## The "nsqrt" stressor in stress-ng is used to test the performance
## of the CPU by repeatedly calculating the value of the square root
## of a number. This is a computationally intensive problem, which
## can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method nsqrt
echo -e '#67 nsqrt completed\n'
echo '#67 nsqrt completed' >>./stress-testors.txt

## The "omega" stressor in stress-ng is used to test the performance
## of the CPU by repeatedly calculating the value of the omega
## function. The omega function uses the Lambert W function to
## calculate the value of the omega function. This is a
## computationally intensive problem, which can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method omega
echo -e '#68 omega completed\n'
echo '#68 omega completed' >>./stress-testors.txt

## The "parity" stressor in stress-ng is used to test the performance
## of the CPU by repeatedly calculating the parity of a number. This
## is a computationally intensive problem, which can put stress
## on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method parity
echo -e '#69 parity completed\n'
echo '#69 parity completed' >>./stress-testors.txt

## The "phi" stressor in stress-ng is used to test the performance of
## the CPU by repeatedly calculating the value of the golden ratio.
## This is a computationally intensive problem, which can put stress
## on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method phi
echo -e '#70 phi completed\n'
echo '#70 phi completed' >>./stress-testors.txt

## The "pi" stressor in stress-ng is used to test the performance of
## the CPU by repeatedly calculating the value of pi. This is a
## computationally intensive problem, which can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method pi
echo -e '#71 pi completed\n'
echo '#71 pi completed' >>./stress-testors.txt

## The "prime" stressor in stress-ng is used to test the performance
## of the CPU by repeatedly calculating prime numbers. This is a
## computationally intensive problem, which can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method prime
echo -e '#72 prime completed\n'
echo '#72 prime completed' >>./stress-testors.txt

## The "psi" stressor in stress-ng is used to test the performance of
## the CPU by repeatedly calculating the digamma function. This is a
## computationally intensive function to calculate, especially for
## large inputs, which makes it a good method for generating CPU load.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method psi
echo -e '#73 psi completed\n'
echo '#73 psi completed' >>./stress-testors.txt

## The "queens" stressor in stress-ng is used to test the performance
## of the CPU by repeatedly solving the N-queens problem. This
## problem involves placing N queens on an N×N chessboard in such a
## way that no two queens are attacking each other. This is a
## computationally intensive problem, which can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method queens
echo -e '#74 queens completed\n'
echo '#74 queens completed' >>./stress-testors.txt

## The "rand" stressor in stress-ng is used to test the performance
## of the CPU by repeatedly generating random numbers using the rand
## algorithm. This involves a lot of floating point operations, which
## can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method rand
echo -e '#75 rand completed\n'
echo '#75 rand completed' >>./stress-testors.txt

## The "rand48" stressor in stress-ng is used to test the performance
## of the CPU by repeatedly generating random numbers using the
## rand48 algorithm. This involves a lot of floating point
## operations, which can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method rand48
echo -e '#76 rand48 completed\n'
echo '#76 rand48 completed' >>./stress-testors.txt

## The "rgb" stressor in stress-ng is used to test the performance of
## the CPU by repeatedly calculating the red, green, and blue values
## of a pixel. This involves a lot of floating point operations,
## which can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method rgb
echo -e '#77 rgb completed\n'
echo '#77 rgb completed' >>./stress-testors.txt

## The "sieve" stressor in stress-ng is used to test the performance
## of the CPU when calculating prime numbers. It does this by using
## the Sieve of Eratosthenes algorithm to calculate prime numbers up
## to a certain limit, which is computationally intensive and can put
## stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method sieve
echo -e '#78 sieve completed\n'
echo '#78 sieve completed' >>./stress-testors.txt

## The "stats" stressor in stress-ng is used to test the performance
## of the CPU by repeatedly calculating the mean, standard deviation,
## and other statistics of a set of numbers. This involves a lot of
## floating point operations, which can put stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method stats
echo -e '#79 stats completed\n'
echo '#79 stats completed' >>./stress-testors.txt

## The "sqrt" stressor in stress-ng is used to test the square root
## performance of the CPU. It does this by repeatedly calculating the
## square root of a number, which is computationally intensive to
## calculate, especially for large inputs, which makes it a good
## method for generating CPU load.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method sqrt
echo -e '#80 sqrt completed\n'
echo '#80 sqrt completed' >>./stress-testors.txt

## The "trig" stressor in stress-ng works by repeatedly calculating
## trigonometric functions such as sine, cosine, tangent, and
## arctangent. These functions are computationally intensive to
## calculate, especially for large inputs, which makes them a good
## method for generating CPU load.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method trig
echo -e '#81 trig completed\n'
echo '#81 trig completed' >>./stress-testors.txt

## The "union" stressor in stress-ng works by creating a union with a
## variety of different data types, and then repeatedly writing to
## and reading from the union using different members. This involves
## a lot of memory operations and type conversions, which can put
## stress on the CPU.
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method union
echo -e '#82 union completed\n'
echo '#82 union completed' >>./stress-testors.txt

## in stress-ng the cpu method all is leveraging all the cpu methods
## available
time stress-ng --cpu 20 -q --timeout ${TIMEOUT}s --taskset 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19 --metrics-brief --cpu-method all
echo -e '#83  all completed\n'
echo "#83  all completed $(date)" >>./stress-testors.txt

#%  bitops callfunc cdouble cfloat clongdouble collatz correlate crc16 decimal32 decimal64 decimal128 dither div8 div16 div32 div64 div128 double euler explog factorial fibonacci fft fletcher16 float float32 float64 float80 float128 floatconversion gamma gcd gray hamming hanoi hyperbolic idct int128 int64 int32 int16 int8 int128float int128double int128longdouble int128decimal32 int128decimal64 int128decimal128 int64float int64double int64longdouble int32float int32double int32longdouble intconversion ipv4checksum jmp lfsr32 ln2 logmap longdouble loop matrixprod nsqrt omega parity phi pi prime psi queens rand rand48 rgb sieve stats sqrt trig union zeta
