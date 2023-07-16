import {
  AppBar,
  Container,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import Typography from "@mui/material/Typography";
import {
  Logo,
  Nav,
  NavList,
  NavMobile,
  LanguageMenu,
  SelectedLanguage,
  AuthMenuWrapper,
} from "./Header.styled";
import logo from "../../SVG/symbol-defs.svg";
import * as React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../redux/auth/selectors";
import { AuthMenu } from "../AuthMenu/AuthMenu";
import { LoggedInMenu } from "../LoggedInMenu/LoggedInMenu";

const locales = { pl: "Polski", ua: "Українська", ru: "Русский" };

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t, i18n } = useTranslation();
  const loggedInStatus = useSelector(isLoggedIn);

  const pages = ["Home", "Learn", "Statistic"];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const langChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Logo>
              <use href={`${logo}#icon-logo`}></use>
            </Logo>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              marginLeft: "10px",
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} sx={{ p: 0 }} onClick={handleCloseNavMenu}>
                  <NavMobile to={page === "Home" ? "/" : page.toLowerCase()}>
                    <Typography textAlign="center" sx={{ fontWeight: 500 }}>
                      {t(`header.${page.toLocaleLowerCase()}`)}
                    </Typography>
                  </NavMobile>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            component="nav"
            sx={{ display: { xs: "none", md: "flex" }, ml: 5 }}
          >
            <NavList>
              {pages.map((page) => (
                <li key={page}>
                  <Nav
                    to={page === "Home" ? "/" : page.toLowerCase()}
                    onClick={handleCloseNavMenu}
                  >
                    {t(`header.${page.toLocaleLowerCase()}`)}
                  </Nav>
                </li>
              ))}
            </NavList>
          </Box>
          <AuthMenuWrapper>
            {loggedInStatus ? <LoggedInMenu /> : <AuthMenu />}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <SelectedLanguage>{i18n.resolvedLanguage}</SelectedLanguage>
              <LanguageIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {Object.keys(locales).map((el) => (
                <LanguageMenu
                  p={{ active: i18n.resolvedLanguage === el }}
                  onClick={() => {
                    handleClose();
                    langChange(el);
                  }}
                  key={el}
                >
                  {locales[el]}
                </LanguageMenu>
              ))}
            </Menu>
          </AuthMenuWrapper>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
