"use client";

import { useState } from "react";
import { storeConfig, type DeliveryCityId, type DeliveryMethodId } from "@/config/store";
import type { CheckoutFormData } from "@/lib/whatsapp";

const emptyForm: CheckoutFormData = {
  nombre: "",
  apellido: "",
  telefono: "",
  ciudad: "",
  direccion: "",
  referencias: "",
  metodoEntrega: "",
};

export function CheckoutForm({
  onSubmit,
}: {
  onSubmit: (data: CheckoutFormData) => void;
}) {
  const [form, setForm] = useState<CheckoutFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  function update<K extends keyof CheckoutFormData>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
    if (!form.nombre.trim()) nextErrors.nombre = "Requerido";
    if (!form.apellido.trim()) nextErrors.apellido = "Requerido";
    if (!form.telefono.trim() || form.telefono.replace(/\D/g, "").length < 10)
      nextErrors.telefono = "Ingresa un teléfono a 10 dígitos";
    if (!form.ciudad) nextErrors.ciudad = "Selecciona una ciudad";
    if (!form.direccion.trim()) nextErrors.direccion = "Requerido";
    if (!form.metodoEntrega) nextErrors.metodoEntrega = "Selecciona un método de entrega";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(form);
  }

  const inputClass =
    "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted";
  const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted";
  const errorClass = "mt-1 text-xs text-accent";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            className={inputClass}
            value={form.nombre}
            onChange={(e) => update("nombre", e.target.value)}
          />
          {errors.nombre && <p className={errorClass}>{errors.nombre}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="apellido">
            Apellido
          </label>
          <input
            id="apellido"
            className={inputClass}
            value={form.apellido}
            onChange={(e) => update("apellido", e.target.value)}
          />
          {errors.apellido && <p className={errorClass}>{errors.apellido}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="telefono">
          Teléfono
        </label>
        <input
          id="telefono"
          type="tel"
          placeholder="10 dígitos"
          className={inputClass}
          value={form.telefono}
          onChange={(e) => update("telefono", e.target.value)}
        />
        {errors.telefono && <p className={errorClass}>{errors.telefono}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="ciudad">
          Ciudad
        </label>
        <select
          id="ciudad"
          className={inputClass}
          value={form.ciudad}
          onChange={(e) => update("ciudad", e.target.value as DeliveryCityId)}
        >
          <option value="">Selecciona tu ciudad</option>
          {storeConfig.deliveryCities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.label}
            </option>
          ))}
        </select>
        {errors.ciudad && <p className={errorClass}>{errors.ciudad}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="direccion">
          Dirección
        </label>
        <input
          id="direccion"
          className={inputClass}
          placeholder="Calle, número, colonia"
          value={form.direccion}
          onChange={(e) => update("direccion", e.target.value)}
        />
        {errors.direccion && <p className={errorClass}>{errors.direccion}</p>}
      </div>

      <div>
        <label className={labelClass} htmlFor="referencias">
          Referencias (opcional)
        </label>
        <textarea
          id="referencias"
          className={inputClass}
          rows={2}
          placeholder="Entre calles, color de casa, punto de referencia..."
          value={form.referencias}
          onChange={(e) => update("referencias", e.target.value)}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="metodoEntrega">
          Método de entrega
        </label>
        <select
          id="metodoEntrega"
          className={inputClass}
          value={form.metodoEntrega}
          onChange={(e) => update("metodoEntrega", e.target.value as DeliveryMethodId)}
        >
          <option value="">Selecciona una opción</option>
          {storeConfig.deliveryMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.label}
            </option>
          ))}
        </select>
        {errors.metodoEntrega && <p className={errorClass}>{errors.metodoEntrega}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-foreground px-6 py-3.5 font-heading text-sm font-semibold uppercase tracking-wide text-background transition-opacity hover:opacity-90"
      >
        Continuar
      </button>
    </form>
  );
}
