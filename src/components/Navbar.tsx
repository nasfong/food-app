import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import { Badge, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { FacebookOutlined, LocalGroceryStore, Menu, Telegram } from '@mui/icons-material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from '@/pages/Home/components/Footer'; import { useGlobalData } from '@/hook/useGlobalData';
import { address, admin, default_image, phone } from '@/constant/constant';

const reload = () => window.location.reload()

const navItems = [
  { label: 'Home', url: '/' },
  { label: 'Our Menu', url: '/our-menu' },
  { label: 'Shop', url: '/shop' },
  { label: 'Gallery', url: '/gallery' },
  { label: 'Our News', url: '/our-news' },
  { label: 'Contact Us', url: '/contact-us' },
  { label: 'Sign In', url: '/sign-in' },
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
  const location = useLocation();
  const navigate = useNavigate()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
    target: window ? window() : undefined,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery((theme as any).breakpoints.down('md'));
  const container = window !== undefined ? () => window().document.body : undefined;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { card } = useGlobalData()

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [_, setHoveredItem] = React.useState(null);

  const handleMouseEnter = (item: any) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleClick = (url: string) => {
    navigate(url)
  }

  function logout() {
    localStorage.removeItem('admin')
    setTimeout(() => {
      reload()
    }, 500)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', bgcolor: '#1a2124', color: '#fff', minHeight: '100%' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Maom Khmer Cuisine
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label}>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleClick(item.url)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      {!isMobile ? (
        <ElevationScroll {...props}>
          <AppBar
            sx={{
              backgroundColor: "#1A2124",
              transition: "transform 0.5s ease",
              transform: trigger ? "translateY(-100%)" : "translateY(0)",
            }}
          >
            <div className='flex justify-between items-center p-2'>
              <div className='flex gap-x-10'>
                <div className='flex align-middle items-center'>
                  <img
                    src="/svg/map.svg"
                    alt=""
                    style={{ height: 15 }}
                    onError={(e) => {
                      (e.target as any).src = default_image
                    }}
                  />
                  <div>
                    {address}
                  </div>
                </div>
                <div className='flex align-middle items-center'>
                  <img
                    src="/svg/phone.svg"
                    alt=""
                    style={{ height: 15 }}
                    onError={(e) => {
                      (e.target as any).src = default_image
                    }}
                  />
                  <div>
                    {phone}
                  </div>
                </div>
              </div>
              <div className='flex align-middle gap-3' onClick={() => navigate('contact-us')}>
                <div>Contact Us</div>
                <FacebookOutlined sx={{ color: '#fff' }} fontSize='small' />
                <Telegram sx={{ color: '#fff' }} fontSize='small' />
                <img src="/svg/tiktok.svg" alt="" className='w-[20px] h-[20px]' />
                {/* <img
                  src="/svg/facebook.svg"
                  alt=""
                  style={{ height: 20 }}
                  onError={(e) => {
                    (e.target as any).src = default_image
                  }}
                /> */}
              </div>
            </div>
          </AppBar>
        </ElevationScroll>
      ) : null}
      <ElevationScroll {...props}>
        <AppBar
          component="nav"
          sx={{
            backgroundColor: trigger || location.pathname === '/store' || location.pathname === '/sign-in' ? "#1A2124" : "transparent",
            transition: "background-color 0.5s ease, transform 0.5s ease",
            boxShadow: 0,
            transform: isMobile || trigger ? "translateY(0)" : "translateY(30%)"
          }}
        >
          <Toolbar className='py-6 flex justify-between'>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div">
              <img src="/image/logo-menu.png" alt="" className='h-[40px] w-[40px]' />
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                {navItems.map((item) => (
                  item.url === '/sign-in' ? (
                    <Button
                      key={item.label}
                      sx={{ color: '#fff', fontFamily: '"Gideon Roman", serif', fontWeight: 500 }}
                      onMouseEnter={() => handleMouseEnter(item)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => admin ? logout() : handleClick(item.url)}
                    >
                      {admin ? 'Logout' : item.label}
                    </Button>
                  ) : (
                    <Button
                      key={item.label}
                      sx={{ color: '#fff', fontFamily: '"Gideon Roman", serif', fontWeight: 500 }}
                      onMouseEnter={() => handleMouseEnter(item)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(item.url)}
                    >
                      {item.label}
                    </Button>
                  )
                ))}
              </Box>
              <Button
                sx={{ color: '#fff' }}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick('/store')}
              >
                <Badge badgeContent={card.length} color="secondary" >
                  <LocalGroceryStore />
                </Badge>
              </Button>
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
            display: { xs: 'block', md: 'none' },
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
      </Box>
    </React.Fragment >
  );
}
