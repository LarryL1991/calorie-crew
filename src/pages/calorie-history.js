import Navbar from "@/components/Navbar";
import WeeklyDisplay from "@/components/WeeklyDisplay";

function history() {
  return (
    <div>
      <Navbar />
      <div>
        <WeeklyDisplay onRefreshData={true} />
      </div>
    </div>
  );
}

export default history;
