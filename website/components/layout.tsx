// import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useCookies } from 'react-cookie';

// mui
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import TranslateIcon from '@material-ui/icons/Translate';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Hidden from '@material-ui/core/Hidden';

import themeOptions from '../assets/theme';

import { SET_PALETTETYPE, SET_THEME } from '../constants/actionTypes';
import { PaletteTypeEnum } from '../enums/PaletteTypeEnum';

import defaultNextI18Next from '../plugins/i18n';
const { i18n, Link, withTranslation } = defaultNextI18Next;


function Layout(props) {
  const { children, paletteType, theme, dispatch, t } = props;

  const [cookies, setCookie] = useCookies(['iBlog']);
  const [anchorElLanguage, setAnchorElLanguage] = useState<null | HTMLElement>(null);
  const [anchorElTheme, setAnchorElTheme] = useState<null | HTMLElement>(null);
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const isLanguageMenuOpen = Boolean(anchorElLanguage);
  const isThemeMenuOpen = Boolean(anchorElTheme);
  const isMenuOpen = Boolean(anchorElMenu);

  const switchPaletteType = () => {
    if (paletteType === PaletteTypeEnum.light) {
      setCookie('paletteType', PaletteTypeEnum.dark, { path: '/' });
      dispatch({ type: SET_PALETTETYPE, paletteType: PaletteTypeEnum.dark});
    } else {
      setCookie('paletteType', PaletteTypeEnum.light, { path: '/' });
      dispatch({ type: SET_PALETTETYPE, paletteType: PaletteTypeEnum.light});
    }
  }

  const switchToEn = () => {
    i18n.changeLanguage('en');
    handleLanguageMenuClose();
  }

  const switchToZh = () => {
    i18n.changeLanguage('zh');
    handleLanguageMenuClose();
  }

  let themeConfig = createMuiTheme({
    palette: {
      type: paletteType,
      ...themeOptions[theme]
    }
  });

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorElLanguage(null);
  };

  const handleThemeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTheme(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setAnchorElTheme(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const switchTheme = (event: React.MouseEvent<HTMLElement>) => {
    const themeIndex = event.currentTarget.dataset.themeIndex;
    dispatch({ type: SET_THEME, theme: themeIndex});
    setCookie('theme', themeIndex, { path: '/' });
    handleThemeMenuClose()
  };

  useEffect(() => {
    if (!!cookies.paletteType) {
      dispatch({ type: SET_PALETTETYPE, paletteType: cookies.paletteType});
    } else {
      setCookie('paletteType', PaletteTypeEnum.light, { path: '/' });
    }
    if (!!cookies.theme) {
      dispatch({ type: SET_THEME, theme: cookies.theme});
    } else {
      setCookie('theme', 0, { path: '/' });
    }
  }, []);
  
  return (
    <ThemeProvider theme={themeConfig}>
      <div>
        <AppBar position='relative' color={ paletteType === PaletteTypeEnum.dark ? 'default' : 'primary' }>
          <Toolbar>
            <Link href="/">
              <Typography variant="h6" noWrap style={{ cursor: 'pointer' }}>
                iBlog
              </Typography>
            </Link>
            <Hidden smUp>
              <IconButton
                style={{ marginLeft: 'auto'}}
                onClick={switchPaletteType}
                color="inherit"
              >
                { paletteType === PaletteTypeEnum.light ? <Brightness4Icon /> : <Brightness5Icon /> }
              </IconButton>
              <IconButton
                onClick={handleLanguageMenuOpen}
                color="inherit"
              >
                <TranslateIcon />
              </IconButton>
              <IconButton
                  onClick={handleMenuOpen}
                  color="inherit"
                >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden xsDown>
              <IconButton
                style={{ marginLeft: 'auto'}}
                onClick={switchPaletteType}
                color="inherit"
              >
                { paletteType === PaletteTypeEnum.light ? <Brightness4Icon /> : <Brightness5Icon /> }
              </IconButton>
              <IconButton
                onClick={handleThemeMenuOpen}
                color="inherit"
              >
                <InvertColorsIcon />
              </IconButton>
              <IconButton
                onClick={handleLanguageMenuOpen}
                color="inherit"
              >
                <TranslateIcon />
              </IconButton>
              <IconButton color="inherit" href="https://github.com/lipohong/iBlog">
                <GitHubIcon />
              </IconButton>
              <Link href="/login">
                <IconButton color="inherit">
                  <AccountCircleIcon />
                </IconButton>
              </Link>
            </Hidden>
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={anchorElLanguage}
          keepMounted
          open={isLanguageMenuOpen}
          onClose={handleLanguageMenuClose}
        >
          <MenuItem onClick={switchToZh}>繁</MenuItem>
          <MenuItem onClick={switchToEn}>EN</MenuItem>
        </Menu>
        <Menu
          anchorEl={anchorElTheme}
          keepMounted
          open={isThemeMenuOpen}
          onClose={handleThemeMenuClose}
        >
          { [1, 2, 3].map((number, index) => (
            <MenuItem onClick={switchTheme} key={index} data-theme-index={index} style={{ color: themeOptions[index].primary.contrastText, backgroundColor: themeOptions[index].primary.light }}>Theme {number}</MenuItem>
          )) }
        </Menu>
        <Menu
          anchorEl={anchorElMenu}
          keepMounted
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <div>
            <IconButton
              style={{ marginLeft: 'auto'}}
              onClick={switchPaletteType}
              color="inherit"
            >
              { paletteType === PaletteTypeEnum.light ? <Brightness4Icon /> : <Brightness5Icon /> }
            </IconButton>
          </div>
          <div>
            <IconButton color="inherit" href="https://github.com/lipohong/iBlog">
              <GitHubIcon />
            </IconButton>
          </div>
          <div>
            <Link href="/login">
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </Link>
          </div>
        </Menu>
        {children}
      </div>
      <style global jsx>{`
        body {
          color: ${ paletteType === PaletteTypeEnum.light ? '#000' : '#fff'};
          background-color:  ${ paletteType === PaletteTypeEnum.light ? '#eee' : '#000'};
        }
      `}</style>
    </ThemeProvider>
  )
}

const mapStateToProps = (state) => {
  const { global } = state;
  return {
    paletteType: global && global.paletteType || PaletteTypeEnum.light,
    theme: global && global.theme || 0
  }
}

Layout.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

export default compose<any>(
  connect(mapStateToProps),
  withTranslation('common')
)(Layout)