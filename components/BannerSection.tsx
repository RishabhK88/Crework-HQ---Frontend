import { Access } from "@/assets/illustrations/Access";
import { Notes } from "@/assets/illustrations/Notes";
import { Tags } from "@/assets/illustrations/Tags";

export const BannerSection = () => {
  return (
    <>
      <div className="bg-white rounded-lg border border-[#F4F4F4] p-4 flex items-center">
        <div className="pr-2">
          <Tags />
        </div>
        <div className="pl-2">
          <div className="mb-1 font-semibold text-[#757575] text-base">
            Introducing tags
          </div>
          <div className="font-normal text-sm text-[#868686]">
            Easily categorize and find your notes by adding tags. Keep your
            workspace clutter-free and efficient.
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-[#F4F4F4] p-4 flex items-center">
        <div className="pr-2">
          <Notes />
        </div>
        <div className="pl-2">
          <div className="mb-1 font-semibold text-[#757575] text-base">
            Share Notes Instantly
          </div>
          <div className="font-normal text-sm text-[#868686]">
            Effortlessly share your notes with others via email or link. Enhance
            collaboration with quick sharing options.
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-[#F4F4F4] p-4 flex items-center">
        <div className="pr-2">
          <Access />
        </div>
        <div className="pl-2">
          <div className="mb-1 font-semibold text-[#757575] text-base">
            Access Anywhere
          </div>
          <div className="font-normal text-sm text-[#868686]">
            Sync your notes across all devices. Stay productive whether you're
            on your phone, tablet, or computer.
          </div>
        </div>
      </div>
    </>
  );
};
