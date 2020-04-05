campeao(2018, 'Palmeiras').
campeao(2017, 'Corinthians').
campeao(2016, 'Palmeiras').
campeao(2015, 'Corinthians').
campeao(2014, 'Cruzeiro').
campeao(2013, 'Cruzeiro').
campeao(2012, 'Fluminense').
campeao(2011, 'Corinthians').
campeao(2010, 'Fluminense').
campeao(2009, 'Flamengo').
campeao(2008, 'Sao Paulo').
campeao(2007, 'Sao Paulo').
campeao(2006, 'Sao Paulo').
campeao(2005, 'Corinthians').
campeao(2004, 'Santos').
campeao(2003, 'Cruzeiro').
campeao(2002, 'Santos').
campeao(2001, 'Atletico Paranaense').
campeao(2000, 'Vasco da Gama').

vice(2018, 'Flamengo').
vice(2017, 'Palmeiras').
vice(2016, 'Santos').
vice(2015, 'Atletico Mineiro').
vice(2014, 'Sao Paulo').
vice(2013, 'Gremio').
vice(2012, 'Atletico Mineiro').
vice(2011, 'Vasco da Gama').
vice(2010, 'Cruzeiro').
vice(2009, 'Internacional').
vice(2008, 'Gremio').
vice(2007, 'Santos').
vice(2006, 'Internacional').
vice(2005, 'Internacional').
vice(2004, 'Atletico Paranaense').
vice(2003, 'Santos').
vice(2002, 'Corinthians').
vice(2001, 'São Caetano').
vice(2000, 'São Caetano').

estadio(2018, 'Sao Januario').
estadio(2017, 'Arena Corinthians').
estadio(2016, 'Allianz Parque').
estadio(2015, 'Arena Corinthians').
estadio(2014, 'Mineirao').
estadio(2013, 'Barradao').
estadio(2012, 'Maracana').
estadio(2011, 'Arena Corinthians').
estadio(2010, 'Maracana').
estadio(2009, 'Mineirao').
estadio(2008, 'Morumbi').
estadio(2007, 'Morumbi').
estadio(2006, 'Morumbi').
estadio(2005, 'Morumbi').
estadio(2004, 'Vila belmiro').
estadio(2003, 'Mineirao').
estadio(2002, 'Vila belmiro').
estadio(2001, 'Arena da Baixada').
estadio(2000, 'São Januario').

timesQueFoiCampeao(X, Y, P):-campeao(Y,X), estadio(Y, P).
