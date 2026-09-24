import { Truck } from "lucide-react";
import { storeConfig } from "@/config/store";

export function DeliveryInfo() {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex items-center gap-2">
        <Truck size={16} className="text-accent" />
        <p className="font-heading text-xs font-semibold uppercase tracking-wide">
          Entregas disponibles
        </p>
      </div>
      <ul className="mt-3 space-y-1.5 text-sm text-muted">
        {storeConfig.deliveryCities.map((city) => (
          <li key={city.id} className="flex items-center justify-between gap-3">
            <span>{city.label}</span>
            <span className="text-xs">{city.etaDays}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
