Usage:

```
http://dfm.github.com/ads_search?ads={query}
```

where {query} is something like:

```
roediger
```

which will search for all papers by ```Roediger```.  More sophisticatedly,

```
widrow courteau 2007
```

will search for papers by Widrow and Courteau in 2007.  You can also search between two years by typing

```
widrow courteau 1986 2011
```

which is equivalent to 

```
2011 widrow courteau 1986
```

or any other permutation.

You can also include ```or``` anywhere in the search phrase to change the logic:

```
widrow or courteau 1991 2007
```

