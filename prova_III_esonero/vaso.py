cp = [[4.25, 0], [3.21, 1.81], [2.76, 2.88], [4.36, 3.58]]
dom = larDomain([32]);
mapping = larBezierCurve(cp);
obj = larMap(mapping)(dom);
VIEW(STRUCT(MKPOLS(obj)));