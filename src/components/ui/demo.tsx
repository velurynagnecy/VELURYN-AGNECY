import { InteractiveTravelCard } from "@/components/ui/3d-card";

export default function InteractiveTravelCardDemo() {
  return (
    // The container uses theme variables and provides perspective for the 3D effect.
    <div className="flex min-h-[30rem] w-full items-center justify-center bg-background p-8">
       <div 
        style={{
          perspective: "1000px"
        }}
       >
        <InteractiveTravelCard
          title="Sapa Valley"
          subtitle="Vietnam"
          imageUrl=""
          actionText="Book your trip"
          href="https://en.wikipedia.org/wiki/Sa_Pa"
          onActionClick={() => {
            alert("This action can be customized via the onActionClick prop.");
          }}
        />
      </div>
    </div>
  );
}
