import getDaysFromToday from '@/utils/getDaysFromToday';
import { getPbImage } from '@/utils/getPbImage';

type ListProductProps = {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  title: string;
  price: number;
  photo: string[];
  grade: string;
  description: string;
  brand_name: string;
  model_name: string;
  size: string;
  isSale: true;
};

type listProps = {
  list: ListProductProps;
};

function ListProduct({ list }: listProps): JSX.Element {
  console.log(list);
  const pt = list.photo[0];
  return (
    <li className=" w-[17rem] border rounded-[20px] shadow-root m-auto">
      <figure className="m-0">
        <img
          src={getPbImage(list.collectionId, list.id, pt)}
          alt={list.title}
          className="w-[17rem] h-[16.5rem] rounded-t-[20px]"
        />
        <figcaption className="p-5 flex flex-col justify-between h-32">
          <div className="text-lg font-medium">
            {list.title}
            <span> ({list.size})</span>
          </div>
          <div className="flex flex-row justify-between">
            <div>{list.price.toLocaleString()}원</div>
            <span className="text-gray-500">
              {getDaysFromToday(list.created)}
            </span>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default ListProduct;
