import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeMode } from "../../context/ThemeModeContext";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const { mode, toggleThemeMode } = useThemeMode();
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const lang = event.target.value as string;
    i18n.changeLanguage(lang);
  };

  const navItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.apply"), path: "/apply" },
    { label: t("nav.submissions"), path: "/submissions" },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ py: 2, bgcolor: "primary.main", color: "white" }}>
        <Typography variant="h6" component="div">
          Smart Insurance
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              sx={{
                textAlign: "center",
                color: isActiveRoute(item.path) ? "primary.main" : "inherit",
                fontWeight: isActiveRoute(item.path) ? "bold" : "normal",
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem
          disablePadding
          sx={{ display: "flex", justifyContent: "center", py: 1 }}
        >
          <IconButton onClick={toggleThemeMode} color="primary">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{ display: "flex", justifyContent: "center", py: 1 }}
        >
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={i18n.language.split("-")[0]}
              onChange={handleLanguageChange}
              variant="outlined"
              sx={{
                color: theme.palette.text.primary,
                ".MuiSvgIcon-root": { color: theme.palette.text.primary },
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.action.disabled,
                },
              }}
            >
              <MenuItem value={"en"}>EN</MenuItem>
              <MenuItem value={"es"}>ES</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.paper,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: "70px" }}>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 40,
                height: 40,
                mr: 1,
                display: { xs: "none", sm: "flex" },
              }}
            >
              SI
            </Avatar>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                color: "primary.main",
                flexGrow: 1,
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "0.02em",
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              Smart Insurance
            </Typography>
          </Box>

          {/* Mobile menu icon */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ color: "primary.main" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Desktop navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={RouterLink}
                to={item.path}
                sx={{
                  mx: 1,
                  color: isActiveRoute(item.path)
                    ? "primary.main"
                    : "text.secondary",
                  fontWeight: 500,
                  position: "relative",
                  py: 2.5,
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: isActiveRoute(item.path) ? "100%" : "0%",
                    height: "3px",
                    bottom: 0,
                    left: 0,
                    bgcolor: "primary.main",
                    transition: "width 0.2s ease-in-out",
                  },
                  "&:hover": {
                    bgcolor: "transparent",
                    "&::after": {
                      width: "100%",
                    },
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            {/* Theme Toggle Button */}
            <IconButton
              sx={{ ml: 1 }}
              onClick={toggleThemeMode}
              color="primary"
            >
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* Language Switcher */}
            <FormControl size="small" sx={{ m: 1, minWidth: 80 }}>
              <Select
                value={i18n.language.split("-")[0]}
                onChange={handleLanguageChange}
                sx={{
                  color: "text.primary",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.5)"
                        : "rgba(0, 0, 0, 0.23)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "white"
                        : theme.palette.text.primary,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "white"
                        : theme.palette.primary.main,
                  },
                  ".MuiSvgIcon-root": {
                    color: "text.primary",
                  },
                }}
                variant="outlined"
              >
                <MenuItem value={"en"}>EN</MenuItem>
                <MenuItem value={"es"}>ES</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            borderRadius: "0 0 8px 0",
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
