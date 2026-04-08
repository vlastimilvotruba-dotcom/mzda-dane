import React from 'react';
import { Box, Typography, Divider, Paper, Link } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const PRIMARY = '#1565c0';

export default function ContactPage() {
  return (
    <Box sx={{ maxWidth: 700, mx: 0 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Kontakt
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="body1" paragraph>
        Máte dotaz k výpočtům, narazili jste na chybu nebo chcete navrhnout novou funkci? Napište nám e-mail – obvykle odpovídáme do 1–2 pracovních dnů.
      </Typography>

      <Paper
        variant="outlined"
        sx={{ p: 3, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}
      >
        <EmailOutlinedIcon sx={{ color: PRIMARY, fontSize: 32 }} />
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            E-mailová adresa
          </Typography>
          <Link href="mailto:vov.software@gmail.com" variant="h6" underline="hover" sx={{ color: PRIMARY, fontWeight: 700 }}>
            vov.software@gmail.com
          </Link>
        </Box>
      </Paper>

      <Box mt={4}>
        <Typography variant="h5" fontWeight={700} sx={{ color: PRIMARY }} gutterBottom>
          O autorovi webu
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" paragraph>
          Web <strong>mzda-dane.cz</strong> provozuje samostatný vývojář se zájmem o osobní finance a české daňové právo. Cílem projektu je nabídnout bezplatné, přehledné a aktuální kalkulačky pro zaměstnance i podnikatele v České republice.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Všechny výpočty vychází z platných zákonných sazeb (zákon č. 586/1992 Sb. o daních z příjmů, zákon č. 589/1992 Sb. o pojistném na sociální zabezpečení, zákon č. 592/1992 Sb. o pojistném na veřejné zdravotní pojištění) a jsou pravidelně aktualizovány při každé zákonné změně.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Výsledky kalkulaček jsou orientační a neslouží jako daňové poradenství. Pro závazné výpočty a konkrétní situace doporučujeme konzultaci s daňovým poradcem nebo účetní.
        </Typography>
      </Box>

      <Box mt={4}>
        <Box display="flex" alignItems="flex-start" gap={1.5}>
          <InfoOutlinedIcon sx={{ color: 'text.secondary', mt: 0.3, fontSize: 20 }} />
          <Typography variant="body2" color="text.secondary">
            Web nesbírá žádné osobní údaje prostřednictvím kontaktního formuláře. Veškerá komunikace probíhá výhradně e-mailem na výše uvedené adrese.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
