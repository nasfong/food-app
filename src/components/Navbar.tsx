import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import { Badge, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { LocalGroceryStore, Menu } from '@mui/icons-material';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from '@/pages/Home/components/Footer'; import { useGlobalData } from '@/hook/useGlobalData';
import { address, admin, facebook, phone, telegram, whatsapp } from '@/constant/constant';
import { address_icon, facebook_icon, phone_icon, telegram_icon, whatsapp_icon } from '@/constant/data';
import { Analytics } from '@vercel/analytics/react'

const navItems = [
  { label: 'Home', url: '/' },
  { label: 'Our Menu', url: '/our-menu' },
  { label: 'Shop', url: '/shop', drop: true },
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

function logout() {
  localStorage.removeItem('admin')
  setTimeout(() => {
    window.location.reload()
  }, 500)
}

function handleSocial(url: string) {
  window.open(url, '_blank')
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
  const { foodType } = useGlobalData()
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

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleClick = (url: string) => {
    navigate(url)
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
            <div className='flex justify-between items-center py-2 container text-sm font-medium'>
              <div className='flex gap-x-10'>
                <div className='flex align-middle items-center gap-2'>
                  <div
                    className='icon'
                    dangerouslySetInnerHTML={{ __html: address_icon }}
                  />
                  <div className=''>
                    {address}
                  </div>
                </div>
                <div className='flex align-middle items-center gap-2 hover:text-[--color] icon-hover cursor-pointer'>
                  <div
                    className='icon'
                    dangerouslySetInnerHTML={{ __html: phone_icon }}
                  />
                  <div className=''>
                    {phone}
                  </div>
                </div>
              </div>
              <div className='flex align-middle gap-8'>
                <div className=' cursor-pointer hover:text-[--color]' onClick={() => navigate('contact-us')}>
                  Contact Us
                </div>
                <div className='flex align-middle gap-3'>
                  <div
                    className='icon icon-hover cursor-pointer'
                    dangerouslySetInnerHTML={{ __html: facebook_icon }}
                    onClick={() => handleSocial(facebook)}
                  />
                  <div
                    className='icon icon-hover cursor-pointer'
                    dangerouslySetInnerHTML={{ __html: telegram_icon }}
                    onClick={() => handleSocial(telegram)}
                  />
                  <div
                    className='icon icon-hover cursor-pointer'
                    dangerouslySetInnerHTML={{ __html: whatsapp_icon }}
                    onClick={() => handleSocial(whatsapp)}
                  />
                </div>
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
            transform: isMobile ? trigger ? "translateY(-100%)" : "translateY(0)" : trigger ? "translateY(0)" : "translateY(40%)",
            px: 0,
          }}
        >
          <Toolbar className='py-6 flex justify-between container'>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" className="cursor-pointer relative w-[60px] md:w-[70px]" onClick={() => navigate('/')}>
              <img
                src="/image/logo-menu.png"
                alt={`logo - menu.png`}
                className="absolute top-[-35px] left-5 h-100 w-100"
                loading="lazy"
              />
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                {navItems.map((item, index) => (
                  item.url === '/sign-in' ? (
                    <NavLink
                      key={index}
                      to={admin ? null : item.url}
                      className={`
                    text-sm
                    uppercase mx-5 
                    font-serif
                    ${location.pathname === item.url ? 'text-[#CB933D]' : ''}
                    hover:text-[#CB933D]
                    `}
                      onClick={() => admin ? logout() : handleClick(item.url)}
                    >
                      {admin ? 'Logout' : item.label}
                    </NavLink>
                  ) : (
                    !item.drop ? (
                      <NavLink
                        key={index}
                        to={item.url}
                        className={`
                      text-sm
                      uppercase mx-5 
                      font-serif
                      ${location.pathname === item.url ? 'text-[#CB933D]' : ''}
                      hover:text-[#CB933D]
                      `}
                      >
                        {item.label}
                      </NavLink>
                    ) : (
                      <span className="group relative cursor-pointer" key={index}>
                        <div className="dropdown dropdown-hover">
                          <NavLink
                            to={item.url}
                            className={`
                            text-sm
                            uppercase mx-5 
                            font-serif
                            ${location.pathname.startsWith(item.url) ? 'text-[#CB933D]' : ''}
                            hover:text-[#CB933D]
                          `}
                          >{item.label}</NavLink>
                          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {foodType?.map(food => (
                              <li>
                                <NavLink
                                  key={food._id}
                                  to={`/shop/${food._id}`}
                                  className={`block border-b border-gray-100 
                                font-semibold
                                ${location.pathname.includes(food._id) ? 'text-[#CB933D]' : 'text-black'}
                                hover:text-[#CB933D]
                              `}
                                >
                                  {food.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </span>
                    )
                  )
                ))}
              </Box>
              <Button
                sx={{ color: '#fff' }}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick('/store')}
              >
                <Badge badgeContent={card.length} color='success'>
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
        <main>
          <Outlet />
          <Analytics mode={'production'} />
        </main>
        <footer>
          <Footer />
        </footer>
      </Box>
    </React.Fragment >
  );
}
