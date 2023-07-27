// Author: Meet Kumar Patel
import { Grid, Divider, Typography } from "@mui/material";

export const Comment = (props) => {
  const { title, author, date, description, children} =
    props;
  
  return (
    <Grid container spacing={2} style={{ padding: "1em", marginTop: "15px" }}>
      <Grid item sm={12} style={{ backgroundColor: "#F9F9F9", padding: "3em" }}>
        <Grid container spacing={2}>
          <Grid item sm={11} xs={11}>
            <Typography variant="h4" gutterBottom>
              {title} 
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              posted {date} by {author}
            </Typography>
            <Divider />
            <Typography
              variant="body1"
              gutterBottom
              style={{ margin: "1vh 0 1vh 0" }}
            >
              {description}
            </Typography>
          </Grid>
          <Grid item sm={1} xs={1} style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
              }}
            >
              {children}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
