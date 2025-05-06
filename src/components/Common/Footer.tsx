import React from "react";
import {
  Box,
  Typography,
  Container,
  Link,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: (theme) => theme.palette.background.paper,
        pt: { xs: 6, md: 8 },
        pb: { xs: 6, md: 6 },
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}
              >
                Smart Insurance
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, maxWidth: "300px" }}
            >
              Providing innovative insurance solutions with a modern approach to
              protect what matters most to you.
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <IconButton
                size="small"
                aria-label="facebook"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="twitter"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="linkedin"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="instagram"
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="subtitle2"
              color="text.primary"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link
                href="/"
                underline="none"
                sx={{
                  color: "text.secondary",
                  mb: 1,
                  fontSize: "0.875rem",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Home
              </Link>
              <Link
                href="/apply"
                underline="none"
                sx={{
                  color: "text.secondary",
                  mb: 1,
                  fontSize: "0.875rem",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Apply Now
              </Link>
              <Link
                href="/submissions"
                underline="none"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.875rem",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Submissions
              </Link>
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="subtitle2"
              color="text.primary"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Services
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "text.secondary",
                  mb: 1,
                  fontSize: "0.875rem",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Auto Insurance
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "text.secondary",
                  mb: 1,
                  fontSize: "0.875rem",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Home Insurance
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.875rem",
                  "&:hover": { color: "primary.main" },
                }}
              >
                Life Insurance
              </Link>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="subtitle2"
              color="text.primary"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1, fontSize: "0.875rem" }}
              >
                Mashhad - Iran
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1, fontSize: "0.875rem" }}
              >
                mohsenamini1081@gmail.com
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.875rem" }}
              >
                +989155656532
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", sm: "flex-start" },
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: { xs: 1, sm: 0 } }}
          >
            © {new Date().getFullYear()} Devotel Insurance. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link
              href="#"
              underline="none"
              sx={{
                color: "text.secondary",
                fontSize: "0.75rem",
                "&:hover": { color: "primary.main" },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              underline="none"
              sx={{
                color: "text.secondary",
                fontSize: "0.75rem",
                "&:hover": { color: "primary.main" },
              }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
