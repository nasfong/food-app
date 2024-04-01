import { Card, Typography } from "@material-tailwind/react";
import { IconButton } from "@mui/material";
import { Clear } from '@mui/icons-material'
import { formatMoney } from "@/lib/utils";
import { default_image } from "@/constant/constant";


const TABLE_HEAD = ["", "", "Product", "Price", "Quantity", "Subtotal"];

export function TableWithStripedRows({ data, handleDelete }: any) {
  return (
    <Card className="h-full w-full overflow-scroll" placeholder={undefined}>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70 uppercase"
                  placeholder={undefined}                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, index: any) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <IconButton onClick={() => handleDelete((item.id))}>
                  <Clear />
                </IconButton>
              </td>
              <td className="p-4">
                <img
                  src={item.image}
                  alt=""
                  className="w-[120px] h-[80px]"
                  onError={(e) => {
                    (e.target as any).src = default_image;
                  }}
                />
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined}>
                  {item.name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium" placeholder={undefined}>
                  {formatMoney(item?.price)}
                </Typography>
              </td>
              <td className="p-4">
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium" placeholder={undefined}>
                  {item.quantity}
                </Typography>
              </td>
              <td className="p-4">
                <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium" placeholder={undefined}>
                  {formatMoney(Number(item.price) * item.quantity)}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}