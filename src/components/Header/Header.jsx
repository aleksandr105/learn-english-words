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
import Typography from "@mui/material/Typography";
import { Logo, Nav, NavList, NavMobile } from "./Header.styled";
import logo from "../../SVG/symbol-defs.svg";
import * as React from "react";
import { Link } from "react-router-dom";

const pages = ["Home", "Learn", "Statistic", "Login", "Signup"];

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="home">
            <Logo>
              <use href={`${logo}#icon-logo`}></use>
            </Logo>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "end",
            }}
          >
            <p>Menu</p>
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
                  <NavMobile to={page.toLowerCase()}>
                    <Typography textAlign="center" sx={{ fontWeight: 500 }}>
                      {page}
                    </Typography>
                  </NavMobile>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            component="nav"
            sx={{ display: { xs: "none", md: "flex" }, ml: 3 }}
          >
            <NavList>
              {pages.map((page) => (
                <li key={page}>
                  <Nav to={page.toLowerCase()} onClick={handleCloseNavMenu}>
                    {page}
                  </Nav>
                </li>
              ))}
            </NavList>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
