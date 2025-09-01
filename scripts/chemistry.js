
          function showElement (number = 1) {
            if ((number > 174) && number != 312) {
              qs('#atom-num').value = NaN;
              number = 9999;
            }
            if ((number < -174) && number != -312) {
              qs('#atom-num').value = NaN;
              number = -9999;
            }

            /* Regular v.s. Antimatter */
            if (number <= -1) {
                qs('#atom-num').value = antimatterTable[-number][0];
                qs('#atom-name').innerHTML = antimatterTable[-number][1];
                qs('#atom-covalent').innerHTML = antimatterTable[-number][2];
                qs('#atom-symbol').innerHTML = antimatterTable[-number][3];
                qs('#atom-coords').innerHTML = antimatterTable[-number][4];
                qs('#atom-mass').innerHTML = antimatterTable[-number][5];
                qs('#atom-type').innerHTML = antimatterTable[-number][6];
                qs('#atom-melt').innerHTML = antimatterTable[number][7];
                qs('#atom-boil').innerHTML = antimatterTable[-number][8];
            }
            else if (number >= 0) {
                qs('#atom-num').value = periodicTable[number][0];
                qs('#atom-name').innerHTML = periodicTable[number][1];
                qs('#atom-covalent').innerHTML = periodicTable[number][2];
                qs('#atom-symbol').innerHTML = periodicTable[number][3];
                qs('#atom-coords').innerHTML = periodicTable[number][4];
                qs('#atom-mass').innerHTML = periodicTable[number][5];
                qs('#atom-type').innerHTML = periodicTable[number][6];
                qs('#atom-melt').innerHTML = periodicTable[number][7];
                qs('#atom-boil').innerHTML = periodicTable[number][8];
            }
          }



            for (var i = 138; i <= 174; i += 1) {
            var type;
            if (i <= 143) type = 'superactin';
            else if (i > 143 && i <= 157) type = 'unquadquad';
            else if (i > 157 && i <= 166) type = 'transition metal';
            else if (i > 166 && i <= 169) type = 'post-transition metal';
            else if (i == 170) type = 'metalloid';
            else if (i == 171) type = 'halogen';
            else if (i == 172) type = 'noble gas';
            else if (i == 173) type = 'alkali metal';
            else if (i == 174) type = 'alkaline earth metal';
            else if (i < 174) type = 'impossible'
            else type = 'exotic';
            var suffa = ['Un', 'U'];
            var suffb, suffc;
            var j = i - 100;
            var k = j;
            switch (k % 10) {
              case 0:
                suffc = ['nil', 'n'];
                break;
              case 1:
                suffc = ['un', 'u'];
                break;
              case 2:
                suffc = ['bi', 'b'];
                break;
              case 3:
                suffc = ['tri', 't'];
                break;
              case 4:
                suffc = ['quad', 'q'];
                break;
              case 5:
                suffc = ['pent', 'p'];
                break;
              case 6:
                suffc = ['hex', 'h'];
                break;
              case 7:
                suffc = ['sept', 's'];
                break;
              case 8:
                suffc = ['oct', 'o'];
                break;
              default:
                suffc = ['enn', 'n'];
            }
            switch ((j - (k % 10))/10 % 100) {
              case 0:
                suffb = ['nil', 'n'];
                break;
              case 1:
                suffb = ['un', 'u'];
                break;
              case 2:
                suffb = ['bi', 'b'];
                break;
              case 3:
                suffb = ['tri', 't'];
                break;
              case 4:
                suffb = ['quad', 'q'];
                break;
              case 5:
                suffb = ['pent', 'p'];
                break;
              case 6:
                suffb = ['hex', 'h'];
                break;
              case 7:
                suffb = ['sept', 's'];
                break;
              case 8:
                suffb = ['oct', 'o'];
                break;
              default:
                suffb = ['enn', 'n'];
            }
            periodicTable[i] = [i, suffa[0].toLowerCase() + suffb[0] + suffc[0] + 'ium', suffa[0].toLowerCase() + suffb[0] + suffc[0] + '', suffa[1].toString() + suffb[1] + suffc[1], [1+i, 10], 0.113, type, null, null];
          }
          for (var i = -1; i >= -174; i -= 1) periodicTable[i] = [i, 'anti' + periodicTable[-i][1], 'anti' + periodicTable[-i][2] + '', periodicTable[-i][3] + '&#x0305;', periodicTable[-i][4], periodicTable[-i][5] + ' (antimatter)', 'anti-' + periodicTable[-i][6], periodicTable[-i][7], periodicTable[-i][8]];
          