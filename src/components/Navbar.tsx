import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from '@mui/material';


interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function ElevateAppBar(props: Props) {
  const { window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
    target: window ? window() : undefined,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <React.Fragment>
      <CssBaseline />
      {!isMobile ? (
        <ElevationScroll {...props}>
          <AppBar
            sx={{
              backgroundColor: "#1A2124",
              transition: "transform 0.3s ease",
              transform: trigger ? "translateY(-100%)" : "translateY(0)",
            }}
          >
            <div className='flex justify-between items-center p-2'>
              <div className='flex gap-x-10'>
                <div className='flex align-middle items-center'>
                  <img src="/svg/map.svg" alt="" style={{ height: 15 }} />
                  <div>
                    123 Main Street, Uni 21, New York City
                  </div>
                </div>
                <div className='flex align-middle items-center'>
                  <img src="/svg/phone.svg" alt="" style={{ height: 15 }} />
                  <div>
                    +38 (012) 34 56 789
                  </div>
                </div>
              </div>
              <div className='flex align-middle'>
                <div>Contact Us</div>
                <img src="/svg/facebook.svg" alt="" style={{ height: 20 }} />

              </div>
            </div>
          </AppBar>
        </ElevationScroll>
      ) : null}
      <ElevationScroll {...props}>
        <AppBar
          sx={{
            backgroundColor: trigger ? "#1A2124" : "transparent",
            transition: "background-color 0.3s ease, transform 0.3s ease", // Added transform transition
            boxShadow: 0,
            transform: isMobile || trigger ? "translateY(0)" : "translateY(24%)" // Added transform for animation
          }}
        >
          <Toolbar className='py-8'>
            <Typography variant="h6" component="div">
              Scroll to elevate App bar
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Box sx={{ mt: -8 }}>
        {props.children}
        <Box sx={{ my: 2 }}>
          {/* {[...new Array(100)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')} */}
        </Box>
      </Box>
    </React.Fragment>
  );
}
