"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Cart } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QuantityButton from "../../../components/shared/product/quantity-button";

const CartTable = ({ cart }: { cart: Cart }) => {
  const router = useRouter();

  return (
    <>
      <h1 className="py-4 font-bold">Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <div>
          cart is empty{" "}
          <Link href={"/"} className="">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => {
                  return (
                    <TableRow key={item.productId}>
                      <TableCell className="flex-row items-center">
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.image}
                            width={50}
                            height={50}
                            className="inline"
                          />
                          <span>{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <QuantityButton item={item} />
                      </TableCell>
                      <TableCell>
                        <Link href={`/product/${item.slug}`}>{item.price}</Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default CartTable;
