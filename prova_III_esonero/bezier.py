#Bezier curves in LAR
import sys
sys.path.insert(0, '/home/di-folca/lar-cc/lib/py/')
from splines import *
controlpoints = [[1,1],[2,3],[4,3],[3,1]]
dom = larDomain([32])
mapping = larBezierCurve(controlpoints)
obj = larMap(mapping)(dom)
#VIEW(STRUCT( MKPOLS(obj) + [POLYLINE(controlpoints)] ))

controls = [[0,1],[0,0],[1,0],[1,1],[0,1]]
knots = [0,0,0,0,2,3,3,3]
nubspline = NUBSPLINE(2)(knots)(controls)
#VIEW(nubspline)
VIEW(STRUCT(MKPOLS([controls,[[0,1,2,3,4]]] ) ))

controls = [[1,0],[2,0],[3,3],[2,6],[1,6],[0,3],[1,0]]
knots = [0,0,0,0,1,1,1,1,1]
nubspline = NUBSPLINE(1)(knots)(controls)
#nubspline=STRUCT([nubspline,POLYLINE(controls)])
#VIEW(nubspline)

# punti di controllo uguali aggiungi maggiore l'attrazione verso il punto ripetuto
controls1 = [[0,0],[2.5,5],[6,2],[9,3]]
controls2 = [[0,0],[2.5,5],[2.5,5],[6,2],[9,3]]
controls3 = [[0,0],[2.5,5],[2.5,5],[2.5,5],[6,2],[9,3]]
#i punti di knots servono esclusivamente ad aumentare la chiusura
#importano solo i primi e l'ultimi punti che sono sempre uno in + del grado
knots = [0,0,0,0,1,1,1,1]
nubspline1 = NUBSPLINE(3)(knots)(controls1)
knots = [0,0,0,0,1,2,2,2,2]
nubspline2 = NUBSPLINE(3)(knots)(controls2)
knots = [0,0,0,0,1,2,3,3,3,3]
nubspline3 = NUBSPLINE(3)(knots)(controls3)
#VIEW(STRUCT([nubspline2,POLYLINE(controls1)]))

knots = [0,0,0,1,1,2,2,3,3,4,4,4]
_p=math.sqrt(2)/2.0
controls = [[-1,0,1], [-_p,_p,_p], [0,1,1], [_p,_p,_p],[1,0,1], [_p,-_p,_p],[0,-1,1], [-_p,-_p,_p], [-1,0,1]]
nurbs = NURBS(2)(knots)(controls)
obj = larMap(nurbs)(larDom(knots))
#VIEW(STRUCT( MKPOLS(obj) + [POLYLINE(controls)] 
#	))

print array([1.0, 2.0, 3.14])

###TRANSFINITE 
b1 = BEZIER(S1)([[0,1,0],[0,1,5]])
b2 = BEZIER(S1)([[0,0,0],[0,0,5]])
b3 = BEZIER(S1)([[1,0,0],[2,-1,2.5]
	,[1,0,5]])
b4 = BEZIER(S1)([[1,1,0],[1,1,5]])
b5 = BEZIER(S1)([[0,1,0],[0,1,5]])
controls = [b1,b2,b3,b4,b5]
knots = [0,1,2,3,4,5,6,7]
# periodic B-spline
knots = [0,0,0,1,2,3,3,3]
# non-periodic B-spline
tbspline = TBSPLINE(S2)(2)(knots)(controls)
dom = larModelProduct([larDomain([10]),larDom(knots)])
dom = larIntervals([32,48],'simplex')([1,3])
obj = larMap(tbspline)(dom)
VIEW(STRUCT( MKPOLS(obj) ))
VIEW(SKEL_1(STRUCT( MKPOLS(dom) )))



########## TRANSFINITE
#knots = [0,0,0,1,1,2,2,3,3,4,4,4]
#_p=math.sqrt(2)/2.0
#controls = [[-1,0,1], [-_p,_p,_p], [0,1,1], [_p,_p,_p],[1,0,1], [_p,-_p,_p],[0,-1,1], [-_p,-_p,_p], [-1,0,1]]
#c1 = BEZIER(S1)([[-1,0,0,1],[-1,0,1,1]])
#c2 = BEZIER(S1)([[-_p,_p,0,_p],[-_p,_p,_p,_p]])
#c3 = BEZIER(S1)([[0,1,0,1],[0,1,1,1]])
#c4 = BEZIER(S1)([[_p,_p,0,_p],[_p,_p,_p,_p]])
#c5 = BEZIER(S1)([[1,0,0,1],[1,0,1,1]])
#c6 = BEZIER(S1)([[_p,-_p,0,_p],[_p,-_p,_p,_p]])
#c7 = BEZIER(S1)([[0,-1,0,1],[0,-1,1,1]])
#c8 = BEZIER(S1)([[-_p,-_p,0,_p],[-_p,-_p,_p,_p]])
#c9 = BEZIER(S1)([[-1,0,0,1],[-1,0,1,1]])
#controls = [c1,c2,c3,c4,c5,c6,c7,c8,c9]

#tnurbs = TNURBS(S2)(2)(knots)(controls)
#dom = larModelProduct([larDomain([10]),larDom(knots)])
#dom = larIntervals([10,36],'simplex')([1,4])
#obj = larMap(tnurbs)(dom)
#VIEW(STRUCT( MKPOLS(obj) ))


