import {Container, Typography} from "@mui/material";

const ErrorPage = () => {
  return (
    <div>
      <Container maxWidth="xl">
        <div className={"flex justify-center flex-col"}>
          <Typography variant="h1" color="textSecondary" className={"font-bold text-9xl"}>404 ERROR OCCURRED</Typography>
        </div>
      </Container>
    </div>
  );
};

export default ErrorPage;
