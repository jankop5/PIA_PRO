*version 9.1 1955948150
u 106
R? 4
V? 2
I? 2
@libraries
@analysis
@targets
@attributes
@translators
a 0 u 13 0 0 0 hln 100 PCBOARDS=PCB
a 0 u 13 0 0 0 hln 100 PSPICE=PSPICE
a 0 u 13 0 0 0 hln 100 XILINX=XILINX
@setup
unconnectedPins 0
connectViaLabel 0
connectViaLocalLabels 0
NoStim4ExtIFPortsWarnings 1
AutoGenStim4ExtIFPorts 1
@index
pageloc 1 0 2294 
@status
n 0 117:10:01:20:09:08;1509563348 e 
s 2832 117:10:01:20:09:11;1509563351 e 
c 117:10:01:20:09:06;1509563346
*page 1 0 970 720 iA
@ports
port 7 AGND 400 210 h
@parts
part 3 r 290 110 h
a 0 sp 0 0 0 10 hlb 100 PART=r
a 0 s 0:13 0 0 0 hln 100 PKGTYPE=RC05
a 0 s 0:13 0 0 0 hln 100 GATE=
a 0 a 0:13 0 0 0 hln 100 PKGREF=R2
a 0 ap 9 0 15 0 hln 100 REFDES=R2
a 0 u 13 0 15 25 hln 100 VALUE=14.1k
part 5 vdc 280 140 h
a 0 sp 0 0 22 37 hln 100 PART=vdc
a 0 a 0:13 0 0 0 hln 100 PKGREF=V1
a 1 ap 9 0 24 7 hcn 100 REFDES=V1
a 1 u 13 0 -11 18 hcn 100 DC=14.1V
part 6 idc 460 180 u
a 0 sp 11 0 0 50 hln 100 PART=idc
a 0 a 0:13 0 0 0 hln 100 PKGREF=I1
a 1 ap 9 0 20 10 hcn 100 REFDES=I1
a 1 u 13 0 -9 21 hcn 100 DC=1mA
part 4 r 500 130 D
a 0 sp 0 0 0 10 hlb 100 PART=r
a 0 s 0:13 0 0 0 hln 100 PKGTYPE=RC05
a 0 s 0:13 0 0 0 hln 100 GATE=
a 0 a 0:13 0 0 0 hln 100 PKGREF=R3
a 0 ap 9 0 15 0 hln 100 REFDES=R3
a 0 u 13 0 17 25 hln 100 VALUE=890
part 2 r 380 110 h
a 0 sp 0 0 0 10 hlb 100 PART=r
a 0 s 0:13 0 0 0 hln 100 PKGTYPE=RC05
a 0 s 0:13 0 0 0 hln 100 GATE=
a 0 a 0:13 0 0 0 hln 100 PKGREF=R1
a 0 ap 9 0 15 0 hln 100 REFDES=R1
a 0 u 13 0 15 25 hln 100 VALUE=100
part 1 titleblk 970 720 h
a 1 s 13 0 350 10 hcn 100 PAGESIZE=A
a 1 s 13 0 180 60 hcn 100 PAGETITLE=
a 1 s 13 0 340 95 hrn 100 PAGECOUNT=1
a 1 s 13 0 300 95 hrn 100 PAGENO=1
@conn
w 9
a 0 up 0:33 0 0 0 hln 100 V=
s 280 110 280 140 16
a 0 up 33 0 282 125 hlt 100 V=
s 290 110 280 110 8
w 32
a 0 up 0:33 0 0 0 hln 100 V=
s 330 110 380 110 31
a 0 up 33 0 355 109 hct 100 V=
w 71
a 0 up 0:33 0 0 0 hln 100 V=
s 460 110 460 140 37
s 420 110 460 110 35
s 500 110 500 130 47
s 500 110 460 110 49
a 0 up 33 0 480 109 hct 100 V=
w 82
a 0 up 0:33 0 0 0 hln 100 V=
s 280 180 280 200 18
s 460 180 460 200 57
s 500 200 460 200 52
s 500 170 500 200 50
s 460 200 400 200 86
s 400 200 280 200 105
s 400 200 400 210 22
a 0 up 33 0 320 199 hct 100 V=
@junction
j 290 110
+ p 3 1
+ w 9
j 380 110
+ p 2 1
+ w 32
j 330 110
+ p 3 2
+ w 32
j 460 140
+ p 6 -
+ w 71
j 420 110
+ p 2 2
+ w 71
j 500 130
+ p 4 1
+ w 71
j 460 110
+ w 71
+ w 71
j 280 180
+ p 5 -
+ w 82
j 280 140
+ p 5 +
+ w 9
j 460 180
+ p 6 +
+ w 82
j 500 170
+ p 4 2
+ w 82
j 460 200
+ w 82
+ w 82
j 400 200
+ w 82
+ w 82
j 400 210
+ s 7
+ w 82
@attributes
a 0 s 0:13 0 0 0 hln 100 PAGETITLE=
a 0 s 0:13 0 0 0 hln 100 PAGENO=1
a 0 s 0:13 0 0 0 hln 100 PAGESIZE=A
a 0 s 0:13 0 0 0 hln 100 PAGECOUNT=1
@graphics
