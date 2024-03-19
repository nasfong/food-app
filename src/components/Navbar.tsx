import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import { Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '@/pages/Home/components/Footer';

const navItems = [
  { label: 'Home', url: '/' },
  { label: 'Our Menu', url: '/our-menu' },
  { label: 'Shop', url: '/shop' },
  { label: 'Gallery', url: '/gallery' },
  { label: 'Our New', url: '/our-new' },
  { label: 'Reservation', url: '/reservation' },
  { label: 'Contact Us', url: '/contact-us' },
];
const drawerWidth = 240;
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: any;
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
  const navigate = useNavigate()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
    target: window ? window() : undefined,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const container = window !== undefined ? () => window().document.body : undefined;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [hoveredItem, setHoveredItem] = React.useState(null);

  const handleMouseEnter = (item: any) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label}>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleClick = (url: string) => {
    navigate(url)
  }

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
          component="nav"
          sx={{
            backgroundColor: trigger ? "#1A2124" : "transparent",
            transition: "background-color 0.3s ease, transform 0.3s ease", // Added transform transition
            boxShadow: 0,
            transform: isMobile || trigger ? "translateY(0)" : "translateY(24%)" // Added transform for animation
          }}
        >
          <Toolbar className='py-8 flex justify-between'>
            <Typography variant="h6" component="div">
              Cristiano
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  sx={{ color: '#fff' }}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(item.url)}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Toolbar />

      <Box sx={{ mt: -8 }}>
        {props.children}
        <Outlet />
        <Footer />
        <Box sx={{ my: 2 }}>

        </Box>
      </Box>

    </React.Fragment >
  );
}
