import * as React from "react";
import Typography from "@mui/material/Typography";

interface TitleProps {
  titleTestId?: string;
  children?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <Typography data-testid={props.titleTestId} component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}
