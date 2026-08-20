import { User, RotateCcw, Trash2, Folder } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { patient, careFolders } from "@/lib/data";

export function AvatarSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="h-9 w-9 rounded-full bg-forest text-primary-foreground flex items-center justify-center text-sm font-medium hover:bg-forest/90 transition-colors">
          {patient.name[0]}
        </button>
      </SheetTrigger>
      <SheetContent side="top" className="rounded-t-[32px] bg-white border-t border-border">
        <SheetHeader className="pb-2">
          <SheetTitle className="font-serif text-2xl">{patient.name}</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 py-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {patient.age} · {patient.condition}
            </p>
            <p className="text-sm font-medium">{patient.weeksWithApp} weeks with Buddyguard</p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Care folders
            </p>
            <div className="flex flex-wrap gap-2">
              {careFolders.map((folder) => (
                <span
                  key={folder.id}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${
                    folder.id === "oncology"
                      ? "bg-teal-soft text-teal-foreground"
                      : "bg-amber-soft text-amber-foreground"
                  }`}
                >
                  <Folder className="h-3.5 w-3.5" />
                  {folder.label}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 rounded-2xl bg-muted px-4 py-3 text-sm font-medium hover:bg-muted/80 transition-colors">
              <RotateCcw className="h-4 w-4 text-forest" />
              Reset demo
            </button>
            <button className="w-full flex items-center gap-3 rounded-2xl bg-muted px-4 py-3 text-sm font-medium hover:bg-muted/80 transition-colors text-destructive">
              <Trash2 className="h-4 w-4" />
              Delete all my data
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
