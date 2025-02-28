import BomContainer from "@/components/bomList/BomContainer";

export default function Page({ children }) {
  return (
    <div className="flex flex-col">
      <BomContainer />
    </div>
  );
}
