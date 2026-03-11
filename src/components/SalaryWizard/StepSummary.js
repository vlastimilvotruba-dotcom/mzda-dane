import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Alert,
  Button,
} from '@mui/material';

function StepSummary({ form, result, onBack, onRestart }) {
  if (!result) return null;

  const {
    gross,
    net,
    taxBase,
    taxBeforeCredits,
    tax,
    childBonus,
    socialEmployee,
    healthEmployee,
    socialEmployer,
    healthEmployer,
    totalEmployerCost,
    socialCapMonth,
    credits,
    srazkova,
  } = result;

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h6">Krok 3 – Souhrn</Typography>

      {/* Info o srážkové dani */}
      {srazkova && (
        <Alert severity="warning" variant="outlined">
          Bez podepsaného prohlášení poplatníka se uplatňuje srážková daň
          15 % – žádné slevy na dani nelze uplatnit. Daň je konečná.
        </Alert>
      )}

      {/* Mzda a daň */}
      <Paper variant="outlined">
        <Box p={2}>
          <Typography variant="subtitle1">Mzda a daň</Typography>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>Hrubá mzda</TableCell>
                <TableCell align="right">
                  {gross.toLocaleString('cs-CZ')} Kč
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Daňový základ</TableCell>
                <TableCell align="right">
                  {taxBase.toLocaleString('cs-CZ')} Kč
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  {srazkova ? 'Srážková daň (15 %)' : 'Daň před slevami'}
                </TableCell>
                <TableCell align="right">
                  {taxBeforeCredits.toLocaleString('cs-CZ')} Kč
                </TableCell>
              </TableRow>
              {!srazkova && (
                <TableRow>
                  <TableCell>Daň po slevách</TableCell>
                  <TableCell align="right">
                    {tax.toLocaleString('cs-CZ')} Kč
                  </TableCell>
                </TableRow>
              )}
              {childBonus > 0 && (
                <TableRow>
                  <TableCell>Daňový bonus na děti</TableCell>
                  <TableCell align="right">
                    +{childBonus.toLocaleString('cs-CZ')} Kč
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>
                  <strong>Čistá mzda</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>{net.toLocaleString('cs-CZ')} Kč</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Paper>

      {/* Pojištění a náklady zaměstnavatele */}
      <Paper variant="outlined">
        <Box p={2} display="flex" flexDirection="column" gap={2}>
          <Typography variant="subtitle1">
            Pojištění a náklady zaměstnavatele
          </Typography>

          <Box>
            <Typography variant="subtitle2">Odvody zaměstnance</Typography>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Sociální pojištění (zaměstnanec)</TableCell>
                  <TableCell align="right">
                    {socialEmployee.toLocaleString('cs-CZ')} Kč
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Zdravotní pojištění (zaměstnanec)</TableCell>
                  <TableCell align="right">
                    {healthEmployee.toLocaleString('cs-CZ')} Kč
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>

          <Box>
            <Typography variant="subtitle2">Odvody zaměstnavatele</Typography>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Sociální pojištění (zaměstnavatel)</TableCell>
                  <TableCell align="right">
                    {socialEmployer.toLocaleString('cs-CZ')} Kč
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Zdravotní pojištění (zaměstnavatel)</TableCell>
                  <TableCell align="right">
                    {healthEmployer.toLocaleString('cs-CZ')} Kč
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Celkové mzdové náklady zaměstnavatele</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>
                      {totalEmployerCost.toLocaleString('cs-CZ')} Kč
                    </strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>

          {socialCapMonth && (
            <Alert severity="info" variant="standard">
              Při této výši mzdy byste dosáhl(a) ročního stropu pro
              sociální pojištění přibližně v {socialCapMonth}. měsíci.
              V dalších měsících roku by se čistá mzda zvýšila o částku
              odpovídající neplacenému sociálnímu pojištění.
            </Alert>
          )}
        </Box>
      </Paper>

      {/* Rozpis slev – jen při zálohové dani */}
      {!srazkova && (
        <Paper variant="outlined">
          <Box p={2}>
            <Typography variant="subtitle1">Rozpis slev na dani</Typography>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Sleva na poplatníka</TableCell>
                  <TableCell align="right">
                    −{credits.basicCredit.toLocaleString('cs-CZ')} Kč
                  </TableCell>
                </TableRow>

                {credits.ztpPHoldCredit > 0 && (
                  <TableRow>
                    <TableCell>Sleva pro držitele průkazu ZTP/P</TableCell>
                    <TableCell align="right">
                      −{credits.ztpPHoldCredit.toLocaleString('cs-CZ')} Kč
                    </TableCell>
                  </TableRow>
                )}

                {credits.spouseCredit > 0 && (
                  <TableRow>
                    <TableCell>Sleva na manžela/manželku</TableCell>
                    <TableCell align="right">
                      −{credits.spouseCredit.toLocaleString('cs-CZ')} Kč
                    </TableCell>
                  </TableRow>
                )}

                {credits.studentCredit > 0 && (
                  <TableRow>
                    <TableCell>Sleva na studenta</TableCell>
                    <TableCell align="right">
                      −{credits.studentCredit.toLocaleString('cs-CZ')} Kč
                    </TableCell>
                  </TableRow>
                )}

                {credits.disabilityCredit > 0 && (
                  <TableRow>
                    <TableCell>Sleva na invaliditu</TableCell>
                    <TableCell align="right">
                      −{credits.disabilityCredit.toLocaleString('cs-CZ')} Kč
                    </TableCell>
                  </TableRow>
                )}

                {credits.childrenTotal > 0 && (
                  <>
                    <TableRow>
                      <TableCell>Sleva na děti celkem</TableCell>
                      <TableCell align="right">
                        −{credits.childrenTotal.toLocaleString('cs-CZ')} Kč
                      </TableCell>
                    </TableRow>

                    {credits.child1 > 0 && (
                      <TableRow>
                        <TableCell>Z toho 1. dítě</TableCell>
                        <TableCell align="right">
                          −{credits.child1.toLocaleString('cs-CZ')} Kč
                        </TableCell>
                      </TableRow>
                    )}

                    {credits.child2 > 0 && (
                      <TableRow>
                        <TableCell>Z toho 2. dítě</TableCell>
                        <TableCell align="right">
                          −{credits.child2.toLocaleString('cs-CZ')} Kč
                        </TableCell>
                      </TableRow>
                    )}

                    {credits.child3plus > 0 && (
                      <TableRow>
                        <TableCell>Z toho 3. a další děti</TableCell>
                        <TableCell align="right">
                          −{credits.child3plus.toLocaleString('cs-CZ')} Kč
                        </TableCell>
                      </TableRow>
                    )}

                    {credits.childZtpPBonus > 0 && (
                      <TableRow>
                        <TableCell>Navýšení za děti ZTP/P</TableCell>
                        <TableCell align="right">
                          −{credits.childZtpPBonus.toLocaleString('cs-CZ')} Kč
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )}

                <TableRow>
                  <TableCell>
                    <strong>Celkové slevy</strong>
                  </TableCell>
                  <TableCell align="right">
                    −{credits.totalCredits.toLocaleString('cs-CZ')} Kč
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Paper>
      )}

      {/* Ovládací tlačítka */}
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Button variant="outlined" onClick={onBack}>
          Zpět
        </Button>
        <Button variant="text" onClick={onRestart}>
          Začít znovu
        </Button>
      </Box>
    </Box>
  );
}

export default StepSummary;
