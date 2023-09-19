import "../styles/App.css";
import { Container, Box } from "@mui/material";
import { RegexPatternGallery } from "./RegexPatternGallery";
import { RegexContainerGroup } from "./RegexContainerGroup";
import { RegexReference } from "./RegexReference";

function App() {
  return (
    <div className="App">
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center",
            gap: "50px",
            // py: 3,
            "@media (min-width: 768px)": {
              flexDirection: "row",
              alignItems: "flex-start",
            },
          }}
        >
          <RegexContainerGroup />
          <RegexReference />
        </Box>
        <RegexPatternGallery />
      </Container>
    </div>
  );
}

export default App;
