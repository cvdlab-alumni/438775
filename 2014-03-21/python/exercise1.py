from pyplasm import *

#sinistra alto
grandeLaterale=CUBOID([1.2,3])
grandeLateraleUpper=CUBOID([1,1.9])
grandeLateraleBot=CUBOID([1,0.8])
porta=CUBOID([0.1,0.1])

grandeLateraleBot=COLOR(BLUE)(T([1,2])([0.1,0.1])(grandeLateraleBot))
grandeLateraleUpper=COLOR(BLUE)(T([1,2])([0.1,1])(grandeLateraleUpper))
p1=COLOR(BLUE)(T([1,2])([1.1,1.2])(porta))
p2=COLOR(BLUE)(T([1,2])([0.2,0.9])(porta))
p3=COLOR(BLUE)(T([1,2])([1.1,2.7])(porta))

grandeLaterale=STRUCT([grandeLateraleBot,grandeLateraleUpper,grandeLaterale, p1, p2, p3])

#sinistra centro
lateraleCentro=COLOR(BLUE)(CUBOID([1.2,1]))
lateraleSinistro=STRUCT([grandeLaterale, T(2)(-1)(lateraleCentro)])

#sinistraBasso
grandeLateraleBasso=T(2)(-1)(R([2,3])(PI)(grandeLaterale))
lateraleSinistro=STRUCT([lateraleSinistro, grandeLateraleBasso])

#centro nord
atrio=CUBOID([1.1,1.2])
atrioInt=COLOR(BLUE)(T(2)(0.1)(CUBOID([1,1])))
esterno=COLOR(BLUE)(T(1)(1.1)(CUBOID([0.30,1.2])))
p1=COLOR(BLUE)(T([1])([0.1])(porta))
centroNord=STRUCT([atrio,atrioInt,esterno,p1])

#mezzoColonnato
filaOri = STRUCT([porta, T(1)(0.5)] * 2)
filaVert = STRUCT([porta, T(2)(-0.5)] * 3)
colonnato=T([1,2])([0.5,-1])(STRUCT([filaOri,filaVert]))
esterno=COLOR(BLUE)(T(2)(-2.3)(CUBOID([1.40,2.3])))
areaColonnato=STRUCT([colonnato, esterno])

centro=T(2)(2.3)(STRUCT([centroNord, areaColonnato]))
centro=STRUCT([R([2,3])(PI)(centro), centro])

#accorpo centro e laterale sinistro
lateraleSinistro=T([1,2])([-1.2,.5])(lateraleSinistro)

meta=T(1)(-1.4)(STRUCT([lateraleSinistro,centro]))
metar=R([1,2])(PI)(meta)
floor1=STRUCT([meta,metar])
VIEW(floor1)


