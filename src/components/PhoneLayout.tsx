import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Calendar, MessageCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvatarSheet } from "./AvatarSheet";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/log", label: "Log", icon: MessageCircle },
  { to: "/timeline", label: "Timeline", icon: Calendar },
  { to: "/prep", label: "Prep", icon: FileText },
];

export function PhoneLayout({ children }: { children: React.ReactNode }) {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <div className="min-h-screen w-full bg-sand flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-[390px] h-[844px] max-h-[90vh] bg-ivory rounded-[48px] shadow-2xl overflow-hidden flex flex-col border-[8px] border-white">
        <header className="flex items-center justify-between px-6 pt-8 pb-4">
          <div>
            <p className="text-xs font-medium tracking-widest text-forest uppercase">Buddyguard</p>
          </div>
          <AvatarSheet />
        </header>

        <main className="flex-1 overflow-y-auto px-5 pb-24 scrollbar-hide">
          {children}
        </main>

        <nav className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-border px-6 py-4">
          <ul className="flex items-center justify-between">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = currentPath === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex flex-col items-center gap-1 text-[10px] font-medium transition-colors",
                      active ? "text-forest" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
