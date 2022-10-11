import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
  FormControl,
} from "@mui/material";

import React, { useContext, useState } from "react";
import { MenuContext } from "../../contexts/MenuContext";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const defaultValues = {
  email: "",
  password: "",
};

const defaultError = {
  email: [false, ""],
  password: [false, ""],
};
const Login = () => {
  const { modalState, toggleModals } = useContext(MenuContext);
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(defaultValues);
  const [error, setError] = useState(defaultError);

  const handleClose = () => toggleModals();
  const handleError = (error = false, text = "") => {
    if (error) {
      setError({
        email: [error, text],
        password: [error, text],
      });
    } else {
      setError(defaultError);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await logIn(formValues.email, formValues.password);
      setFormValues(defaultValues);
      handleError();
      handleClose();
      navigate("/private/account");
    } catch (error) {
      handleError(true, "email ou mot de passe invalide");
    }
  };
  return (
    <Modal
      open={modalState.signInModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          id="modal-modal-title"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h5" component="h2">
            Se connecter
          </Typography>
          <IconButton color="error" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box id="modal-modal-decription">
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <TextField
                required
                error={error.email[0]}
                name="email"
                type="email"
                id="logEmail"
                label="E-mail"
                value={formValues.email}
                onChange={handleInputChange}
                helperText={error.email[1]}
                variant="filled"
              />
              <TextField
                required
                error={error.password[0]}
                name="password"
                type="password"
                id="logPassword"
                value={formValues.password}
                onChange={handleInputChange}
                label="Mot de passe"
                helperText={error.password[1]}
                variant="filled"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
              >
                Valider
              </Button>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default Login;