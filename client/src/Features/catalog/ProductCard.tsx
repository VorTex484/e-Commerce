import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../App/api/agent";
import { useStoreContext } from "../../App/context/StoreContext";
import { Product } from "../../App/Models/product";

interface Props {
  product: Product;
}
// We are using the LoadingButton component from @mui/lab

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  // Getting the basket from the context
  const { setBasket } = useStoreContext();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      // Make sure to write the code below. Otherwise, the basket will not be updated !!!
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(1).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{ backgroundSize: "contain" }}
        component="img"
        height="140"
        image={product.pictureURL}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {product.brand} - ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(product.id)}
          size="small"
        >
          Add To Card
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
