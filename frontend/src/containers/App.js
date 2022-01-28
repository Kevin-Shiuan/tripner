//theme
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../theme/Theme';

import Tripner from './AppTripner';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={Theme}>
          <Tripner />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App