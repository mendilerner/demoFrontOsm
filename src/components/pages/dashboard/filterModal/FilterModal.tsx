import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { filterModalStyle } from "../table/style";
import { initialSelectedOptions } from "../../../../utils/filtersFuncs";
import {
  options,
  tSelectedOptions,
} from "../../../../interfaces/interfacesForUtils";

function valuetext(value: number) {
  return `${value}$`;
}
const marks = [
  {
    value: 1,
    label: "1 $",
  },
  {
    value: 1000,
    label: "1000 $",
  },
  {
    value: 2000,
    label: "2000 $",
  },
];
interface pFilterModal {
  open: boolean;
  handleClose: () => void;
  priceValue: number[];
  handleChangePrice: (event: Event, newValue: number[]) => void;
  selectedOptions: tSelectedOptions;
  handleStatusCheckboxChange: (
    _option: options["status"]
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTypeCheckboxChange: (
    _option: options["orderType"]
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const FilterModal = ({
  open,
  handleClose,
  priceValue,
  handleChangePrice,
  selectedOptions,
  handleStatusCheckboxChange,
  handleTypeCheckboxChange,
  handleChangeDate,
}: pFilterModal) => {
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...filterModalStyle, width: 800 }}>
          <Box
            sx={{
              height: "8em",
              width: "100vw",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography
                style={{ fontWeight: 900 }}
                sx={{ textDecoration: "underLine" }}
              >
                Filters:
              </Typography>
            </Box>
            <Box sx={{ display: "flex", height: "10em", width: "25em" }}>
              <Box sx={{ margin: "8px" }}>
                <Typography
                  variant="h6"
                  style={{ fontWeight: 900 }}
                  sx={{ width: "2.5em" }}
                >
                  price:
                </Typography>
                <Slider
                  sx={{
                    width: "12em",
                    color: "#009688",
                    marginLeft: "1em",
                    marginTop: "0.5em",
                  }}
                  getAriaLabel={() => "Temperature range"}
                  value={priceValue}
                  onChange={
                    handleChangePrice as (
                      event: Event,
                      newValue: number | number[]
                    ) => void
                  }
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  max={2000}
                  min={1}
                  step={10}
                  marks={marks}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", height: "10em", width: "25em" }}>
              <Box sx={{ margin: "8px" }}>
                <Typography
                  variant="h6"
                  style={{ fontWeight: 900 }}
                  sx={{ width: "25em" }}
                >
                  status:
                </Typography>
                <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                  {initialSelectedOptions.status.map(
                    (option, index) =>
                      option && (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              sx={{ color: "#009688" }}
                              checked={selectedOptions.status.some(
                                (opt) => opt === option
                              )}
                              onChange={handleStatusCheckboxChange(option)}
                            />
                          }
                          label={option}
                        />
                      )
                  )}
                </FormGroup>
              </Box>
            </Box>

            <Box sx={{ display: "flex", height: "10em", width: "25em" }}>
              <Box sx={{ margin: "8px" }}>
                <Typography
                  noWrap
                  variant="h6"
                  style={{ fontWeight: 900 }}
                  sx={{ width: "9em" }}
                >
                  Delivery type:
                </Typography>
                <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                  {initialSelectedOptions.orderType.map(
                    (option, index) =>
                      option && (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              checked={selectedOptions.orderType.some(
                                (opt) => opt === option
                              )}
                              onChange={handleTypeCheckboxChange(option)}
                            />
                          }
                          label={option}
                        />
                      )
                  )}
                </FormGroup>
              </Box>
            </Box>
            <Box sx={{ display: "flex", height: "10em", marginLeft: "0.5em" }}>
              <Stack spacing={3}>
                <Typography variant="h6" style={{ fontWeight: 900 }}>
                  Date:
                </Typography>

                <input
                  onChange={handleChangeDate}
                  type="date"
                  style={{
                    backgroundColor: "#009688",
                    fontFamily: "sans-serif",
                    border: "none",
                    borderRadius: "1em",
                    height: "2em",
                    width: "15em",
                    marginLeft: "2em",
                    padding: "0.5em",
                  }}
                ></input>
              </Stack>
            </Box>
            <Box sx={{ marginTop: "3em" }}>
              <Button
                startIcon={<DoneIcon />}
                sx={{
                  color: "black",
                  width: "9em",
                  backgroundColor: "#009688",
                  "&:hover": { backgroundColor: "#80cbc4" },
                }}
                onClick={handleClose}
              >
                See results
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default FilterModal;
