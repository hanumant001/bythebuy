"use client";

import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "@/Store/searchSlice";

const deliveryFee = 49;

const OrderPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { checkoutItems } = useSelector((state) => state.searchValue);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const subtotal = useMemo(
    () =>
      checkoutItems.reduce(
        (total, item) => total + Number(item?.price || 0),
        0,
      ),
    [checkoutItems],
  );
  const total = checkoutItems.length ? subtotal + deliveryFee : 0;

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const isFormValid =
    formData.fullName &&
    formData.phone &&
    formData.address &&
    formData.city &&
    formData.pincode;

  const handlePlaceOrder = () => {
    const order = {
      id: `BTB-${Date.now()}`,
      items: checkoutItems,
      customer: formData,
      paymentMethod,
      total,
      createdAt: new Date().toISOString(),
    };

    dispatch(placeOrder(order));
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <main className="pt-24 px-5 pb-10 max-w-3xl mx-auto">
        <Card className="p-8 text-center">
          <Typography variant="h4" gutterBottom>
            Order placed
          </Typography>
          <Typography color="text.secondary" className="mb-6">
            Thanks, {formData.fullName}. Your order has been confirmed.
          </Typography>
          <Button variant="contained" onClick={() => router.push("/")}>
            Continue Shopping
          </Button>
        </Card>
      </main>
    );
  }

  if (!checkoutItems.length) {
    return (
      <main className="pt-24 px-5 pb-10 max-w-3xl mx-auto">
        <Card className="p-8 text-center">
          <Typography variant="h5" gutterBottom>
            No items selected
          </Typography>
          <Typography color="text.secondary" className="mb-6">
            Add a product or checkout from your cart to place an order.
          </Typography>
          <Button variant="contained" onClick={() => router.push("/")}>
            Browse Products
          </Button>
        </Card>
      </main>
    );
  }

  return (
    <main className="pt-24 px-5 pb-10 max-w-6xl mx-auto">
      <Typography variant="h4" className="mb-6">
        Checkout
      </Typography>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        <Box className="flex flex-col gap-5">
          <Card className="p-5">
            <Typography variant="h6" className="mb-4">
              Delivery Details
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={3}
                className="md:col-span-2"
              />
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                fullWidth
              />
            </div>
          </Card>

          <Card className="p-5">
            <Typography variant="h6" className="mb-2">
              Payment Method
            </Typography>
            <FormControl>
              <RadioGroup
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
              >
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Cash on delivery"
                />
                <FormControlLabel
                  value="upi"
                  control={<Radio />}
                  label="UPI on delivery"
                />
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Card on delivery"
                />
              </RadioGroup>
            </FormControl>
          </Card>
        </Box>

        <Card className="p-5 h-fit">
          <Typography variant="h6" className="mb-4">
            Order Summary
          </Typography>
          <Box className="flex flex-col gap-4">
            {checkoutItems.map((item) => (
              <Box key={item.id}>
                <Box className="flex gap-3">
                  <div className="relative w-[72px] h-[72px] shrink-0">
                    <Image
                      src={item?.thumbnail || ""}
                      alt={item?.title || "Product image"}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <Box className="flex-1">
                    <Typography className="font-medium">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.brand || "Generic"} | SKU: {item.sku}
                    </Typography>
                    <Box className="flex items-center gap-1 mt-1">
                      <Rating
                        value={Number(item.rating || 0)}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                      <Typography variant="caption" color="text.secondary">
                        {item.rating}
                      </Typography>
                    </Box>
                    <Typography>Rs. {item.price}</Typography>
                  </Box>
                </Box>

                <Box className="flex flex-wrap gap-2 mt-2">
                  <Chip
                    size="small"
                    label={item.availabilityStatus || "Available"}
                    color={item.stock > 0 ? "success" : "default"}
                  />
                  <Chip
                    size="small"
                    variant="outlined"
                    label={`${item.discountPercentage || 0}% off`}
                  />
                  <Chip
                    size="small"
                    variant="outlined"
                    label={`Min qty: ${item.minimumOrderQuantity || 1}`}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" className="mt-2">
                  {item.shippingInformation} | {item.warrantyInformation}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.returnPolicy}
                </Typography>

                {item.reviews?.[0] ? (
                  <Typography variant="caption" color="text.secondary">
                    Latest review: "{item.reviews[0].comment}" -{" "}
                    {item.reviews[0].reviewerName}
                  </Typography>
                ) : null}
              </Box>
            ))}
          </Box>

          <Divider className="my-4" />
          <Box className="flex justify-between mb-2">
            <Typography color="text.secondary">Subtotal</Typography>
            <Typography>Rs. {subtotal.toFixed(2)}</Typography>
          </Box>
          <Box className="flex justify-between mb-2">
            <Typography color="text.secondary">Delivery</Typography>
            <Typography>Rs. {deliveryFee.toFixed(2)}</Typography>
          </Box>
          <Divider className="my-4" />
          <Box className="flex justify-between mb-5">
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">Rs. {total.toFixed(2)}</Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            disabled={!isFormValid}
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </Card>
      </div>
    </main>
  );
};

export default OrderPage;
