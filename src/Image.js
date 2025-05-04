import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import { styled } from "@mui/joy/styles";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import axios from "axios";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function ImageEnhancer() {
  const [originalImageURL, setOriginalImageURL] = useState("");
  const [enhancedImageURL, setEnhancedImageURL] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setOriginalImageURL(imageUrl);
    setEnhancedImageURL("");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("sizeFactor", "2");
    formData.append("imageStyle", "default");
    formData.append("noiseCancellationFactor", "0");

    try {
      const response = await axios.post("https://api.picsart.io/tools/1.0/upscale", formData, {
        headers: {
          "X-RapidAPI-Key": "YOUR_API_KEY", // Replace this
          "X-RapidAPI-Host": "ai-picture-upscaler.p.rapidapi.com",
        },
      });

      setEnhancedImageURL(response.data); // Adjust if needed
    } catch (err) {
      console.error("Enhancement failed:", err);
      alert("Something went wrong while enhancing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ px: 4, py: 6, background: "#f4f6f8", minHeight: "100vh" }}>
      <Typography level="h2" textAlign="center" sx={{ mb: 1, fontWeight: 800 }}>
        ✨ AI Image <span style={{ color: "#e82255" }}>Enhancer</span>
      </Typography>
      <Typography level="body-lg" textAlign="center" sx={{ mb: 4, color: "text.secondary" }}>
        Improve photo quality and resolution in one click — fast and effortless.
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="center"
        gap={4}
        sx={{ mb: 6 }}
      >
        {/* Upload Box */}
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed #aaa",
            borderRadius: 4,
            background: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(10px)",
            transition: "0.3s",
            boxShadow: "0 0 30px rgba(0,0,0,0.1)",
            "&:hover": {
              background: "rgba(255,255,255,0.7)",
              borderColor: "#e82255",
              transform: "scale(1.02)",
            },
          }}
        >
          <Button
            component="label"
            size="lg"
            startDecorator={<FileUploadOutlinedIcon />}
            sx={{
              backgroundColor: "#e82255",
              color: "#fff",
              borderRadius: "xl",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#c51e47",
              },
            }}
          >
            Upload Image
            <VisuallyHiddenInput
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleUpload}
            />
          </Button>
        </Box>

        {/* Animation Preview */}
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            textAlign: "center",
            filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.1))",
          }}
        >
          <Box
            component="img"
            src="enhan.gif"
            alt="Enhancing animation"
            width="100%"
            sx={{ maxHeight: 220 }}
          />
        </Box>
      </Box>

      {/* Results */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
      >
        {originalImageURL && (
          <Box
            sx={{
              width: { xs: "90%", md: "40%" },
              boxShadow: "lg",
              borderRadius: 4,
              backgroundColor: "#fff",
              p: 1,
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.01)",
                boxShadow: "xl",
              },
            }}
          >
            <Typography level="body-sm" textAlign="center" sx={{ pb: 1 }}>
              Original Image
            </Typography>
            <Box component="img" src={originalImageURL} width="100%" alt="Original" />
          </Box>
        )}

        {loading ? (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <CircularProgress color="danger" size="lg" />
            <Typography level="body-md" sx={{ mt: 1 }}>
              Enhancing image...
            </Typography>
          </Box>
        ) : enhancedImageURL ? (
          <Box
            sx={{
              width: { xs: "90%", md: "40%" },
              boxShadow: "lg",
              borderRadius: 4,
              backgroundColor: "#fff",
              p: 1,
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.01)",
                boxShadow: "xl",
              },
            }}
          >
            <Typography level="body-sm" textAlign="center" sx={{ pb: 1 }}>
              Enhanced Image
            </Typography>
            <Box component="img" src={enhancedImageURL} width="100%" alt="Enhanced" />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
