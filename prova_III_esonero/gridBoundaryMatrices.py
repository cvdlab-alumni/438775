import sys
sys.path.insert(0, '/home/di-folca/lar-cc/lib/py/')
from simplexn import *
from larcc import *
from lar2psm import *
from largrid import *
from morph import *
from mapper import *
from lar2psm import *
from largrid import *
from morph import *
from mapper import *
from numpy import *

#Queste dovrebbero essere le matrici che permettono di riconoscere il bordo

def gridBoundaryMatrices(shape): 
	skeletons = gridSkeletons(shape)
	boundaryMatrices = [boundary(skeletons[k+1],faces) for k,faces in enumerate(skeletons[:-1])]
	return boundaryMatrices

for k in range(1):
	print"n n gridBoundaryMatrices([3]) = n n" 
	print csr2DenseMatrix(gridBoundaryMatrices([3])[k])

for k in range(2):
	print "gridBoundaryMatrices([3,2]) =n n" 
	print csr2DenseMatrix(gridBoundaryMatrices([3,2])[k])

for k in range(3):
	print"n n gridBoundaryMatrices([3,2,1]) =n n"
	print csr2DenseMatrix(gridBoundaryMatrices([3,2,1])[k])
