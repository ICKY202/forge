import {Dialog, DialogContent, DialogTrigger, DialogHeader, DialogDescription, DialogTitle} from "@/components/ui/dialog";
import { PricingTable } from "@clerk/nextjs";
import { BlueTitle } from "./reusables";


export const PricingModal = ({children, reason}: Readonly<{children: React.ReactNode, reason?: string}>) => {
    const title = reason === "Credits" ? "you are out of credits" : "Upgrade your plan";

    const description = reason === "Credits" ? "You have used all your credits. Upgrade to a higher plan to get more credits." : "Upgrade to a higher plan to unlock more features and capabilities.";

    return (
      <Dialog>
        <DialogTrigger className="cursor-pointer">{children}</DialogTrigger>
        <DialogContent className="border-white/10 bg-[#0f0f0f] sm:max-w-6xl text-white p-0 overflow-y-auto max-h-[90dvh]">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="font-serif text-white/90 text-xl tracking-tight">
                <BlueTitle className="text-4xl">{title}</BlueTitle>
            </DialogTitle>
            <DialogDescription className="text-sm text-white/35">
             {description}
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-6">
            <PricingTable 
                checkoutProps={{
                    appearance: {
                        elements: {
                            drawerRoot: {
                                zIndex: 2000
                            }
                        }
                    }
                }}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
}