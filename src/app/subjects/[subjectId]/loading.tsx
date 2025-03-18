import { Loading as Loader } from "../../../components/Loading";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
}
