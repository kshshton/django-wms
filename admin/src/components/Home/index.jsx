import WarehouseIcon from "@mui/icons-material/Warehouse";
import IconButton from "@mui/material/IconButton";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <IconButton>
        <WarehouseIcon style={{ color: "#1956d2", fontSize: 200 }} />
      </IconButton>
      <h1 style={{ color: "#1976d2", marginTop: "16px" }}>
        Warehouse Management System
      </h1>
    </div>
  );
};

export default Home;
