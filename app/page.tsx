"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Star,
  Sparkles,
  Mail,
  Phone,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import DiscoBall from "@/components/DiscoBall";
import Image from "next/image";

export default function QuinceaneraInvitation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    message: "",
    attendance: "",
  });

  const { scrollY } = useScroll();

  const envelopeFlap = useTransform(scrollY, [0, 300], [0, -180]);
  const envelopeOpacity = useTransform(scrollY, [300, 500], [1, 0]);

  const cardScale = useTransform(scrollY, [300, 600], [1, 3]);
  const cardOpacity = useTransform(scrollY, [500, 700], [1, 0]);

  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  const [positions, setPositions] = useState<
    Array<{ left: string; top: string }>
  >([]);

  useEffect(() => {
    const newPositions = Array(20)
      .fill(null)
      .map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }));
    setPositions(newPositions);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.attendance) {
      toast({
        title: "Error",
        description: "Por favor completa los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      toast({
        title: "¡Confirmación enviada!",
        description: "Gracias por confirmar tu asistencia. ¡Te esperamos!",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: "1",
        message: "",
        attendance: "",
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast({
        title: "Error",
        description:
          "Hubo un error al enviar tu confirmación. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DiscoBall />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 overflow-hidden">
        {/* Envelope Animation */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
              {/* Background Elements */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{ y: y1 }}
              >
                <div className="absolute top-20 left-10 w-32 h-32 bg-slate-300 rounded-full blur-3xl" />
                <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300 rounded-full blur-2xl" />
                <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-300 rounded-full blur-3xl" />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: y2 }}
              >
                {positions.map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: pos.left,
                      top: pos.top,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  >
                    {i % 3 === 0 ? (
                      <Star className="w-4 h-4 text-slate-400" />
                    ) : i % 3 === 1 ? (
                      <Heart className="w-3 h-3 text-purple-400" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-blue-400" />
                    )}
                  </motion.div>
                ))}
              </motion.div>
              <div className="fixed">
                <motion.div
                  className="relative z-10"
                  style={{ opacity: envelopeOpacity }}
                >
                  <div className="relative w-[300px] h-[200px] md:w-[900px] md:h-[500px]">
                    {/* Envelope Body */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg shadow-2xl border-2 border-slate-300/50 scale" />

                    {/* Envelope Flap */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-40 md:h-80 bg-gradient-to-br from-slate-300 to-slate-400 origin-top rounded-t-lg shadow-lg"
                      style={{
                        clipPath: "polygon(0 0, 50% 70%, 100% 0)",
                        rotateX: envelopeFlap,
                      }}
                    />

                    {/* Envelope Content Preview */}
                    <div className="absolute inset-4 flex items-center justify-center">
                      <div className="text-center">
                        <motion.div
                          className="mb-8"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        >
                          <div className="w-24 h-24 md:w-36 md:h-36 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-400 to-blue-500 p-1">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                              <span className="text-5xl font-bold bg-gradient-to-r from-slate-500 to-blue-600 bg-clip-text text-transparent">
                                15
                              </span>
                            </div>
                          </div>
                        </motion.div>
                        <p className="text-lg text-slate-600">XV Años</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{
                    opacity: cardOpacity,
                    scale: cardScale,
                  }}
                >
                  <div className="w-40 h-32 md:w-80 md:h-56 bg-gradient-to-br from-white via-slate-50 to-purple-50 rounded-xl shadow-2xl border-4 border-slate-200/50 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <Heart className="w-12 h-12 text-slate-500 mx-auto mb-4 animate-pulse" />
                      </motion.div>
                      <motion.h1
                        className="font-script bg-gradient-to-r from-slate-600 via-purple-500 to-blue-600 bg-clip-text text-transparent mb-4 font-bold"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                      >
                        Alma Morena Gamboa
                      </motion.h1>
                      <motion.p
                        className="text-gray-600 mb-8 font-light drop-shadow-2xl"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                      >
                        Te invita a celebrar sus XV años
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Scroll Indicator */}
              <motion.div
                className="bottom-8 left-1/2 transform -translate-x-1/2 fixed"
                animate={{ y: [0, 10, 0] }}
                style={{ opacity: cardOpacity }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse" />
                </div>
              </motion.div>
            </section>

            {/* Event Details */}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <section className="py-20 px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  className="text-center mb-16"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-script text-slate-600 mb-4">
                    Detalles del Evento
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-slate-400 to-blue-500 mx-auto" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Calendar,
                      title: "Fecha",
                      content: "Sábado\n5 de Julio 2025",
                      delay: 0.2,
                    },
                    {
                      icon: Clock,
                      title: "Hora",
                      content: "19:30 hs - 02:00 hs",
                      delay: 0.4,
                    },
                    {
                      icon: MapPin,
                      title: "Lugar",
                      content:
                        "Calle Marcelino Champagnat 1600\nBarrio La Candela",
                      delay: 0.6,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: item.delay }}
                      viewport={{ once: true }}
                    >
                      <Card className="text-center p-8 bg-white/80 backdrop-blur-sm border-slate-200 hover:shadow-xl transition-all duration-300">
                        <CardContent className="pt-6">
                          <motion.div
                            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-400 to-blue-500 rounded-full flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <item.icon className="w-8 h-8 text-white" />
                          </motion.div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 whitespace-pre-line">
                            {item.content}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Photo Gallery */}
            {/* <section className="py-20 px-4 bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  className="text-center mb-16"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-script text-slate-600 mb-4">
                    Momentos Especiales
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-slate-400 to-blue-500 mx-auto" />
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <motion.div
                      key={i}
                      className="aspect-square relative overflow-hidden rounded-lg"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      viewport={{ once: true }}
                    >
                      <Image
                        src={`/placeholder.svg?height=300&width=300&text=Foto ${i}`}
                        alt={`Momento ${i}`}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section> */}

            <section>
              <div className="max-w-4xl mx-auto">
                <motion.div
                  className="text-center flex flex-col justify-center items-center gap-5"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-6xl font-script text-slate-600">Alias</h2>
                  <p className="text-2xl">morenagamboa57</p>
                  <Image
                    src="/mercadopago.png"
                    alt="MP"
                    width={200}
                    height={200}
                  />
                </motion.div>
              </div>
            </section>

            {/* Location Map */}
            <section className="py-20 px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  className="text-center mb-16"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-script text-slate-600 mb-4">
                    Ubicación
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-slate-400 to-blue-500 mx-auto mb-8" />
                  <p className="text-gray-600 text-lg">
                    Gran fiesta en el SUM
                    <br />
                    Calle Marcelino Champagnat 1600
                    <br />
                    Cel: 11 6887-7323
                  </p>
                </motion.div>

                <motion.div
                  className="rounded-xl overflow-hidden shadow-2xl"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.047464895093!2d-58.92843982431259!3d-34.4386072730007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc82cc204d7f5b%3A0xf7380cea974fb6b0!2sBARRIO%20CERRADO%20LA%20CANDELA!5e0!3m2!1ses-419!2sar!4v1718285950735!5m2!1ses-419!2sar"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  />
                </motion.div>

                <motion.div
                  className="text-center mt-8"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Button
                    className="bg-gradient-to-r from-slate-500 to-blue-600 hover:from-slate-600 hover:to-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() =>
                      window.open(
                        "https://www.google.com/maps/place/BARRIO+CERRADO+LA+CANDELA/@-34.4386035,-58.94273,15z/data=!4m10!1m2!2m1!1sCalle+Marcelino+Champagnat+1600++Barrio+La+Candela+-+Gran+fiesta+gran+en+el+SUM.+!3m6!1s0x95bc82cc204d7f5b:0xf7380cea974fb6b0!8m2!3d-34.4386035!4d-58.9262505!15sClBDYWxsZSBNYXJjZWxpbm8gQ2hhbXBhZ25hdCAxNjAwICBCYXJyaW8gTGEgQ2FuZGVsYSAtIEdyYW4gZmllc3RhIGdyYW4gZW4gZWwgU1VNLlpOIkxjYWxsZSBtYXJjZWxpbm8gY2hhbXBhZ25hdCAxNjAwIGJhcnJpbyBsYSBjYW5kZWxhIGdyYW4gZmllc3RhIGdyYW4gZW4gZWwgc3VtkgERdG93bmhvdXNlX2NvbXBsZXiaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUTFPUzFMVFZOM0VBRaoBygEKDS9nLzExZnpmOXJieTgKDS9nLzExaDcxbnI1bTQQASo1IjExNjAwIGJhcnJpbyBsYSBjYW5kZWxhIGdyYW4gZmllc3RhIGdyYW4gZW4gZWwgc3VtKA4yHxABIhuHYrG9FmmIjyj7EgsO1EPa661yaT5DGk5Db8oyUBACIkxjYWxsZSBtYXJjZWxpbm8gY2hhbXBhZ25hdCAxNjAwIGJhcnJpbyBsYSBjYW5kZWxhIGdyYW4gZmllc3RhIGdyYW4gZW4gZWwgc3Vt4AEA-gEECAAQOw!16s%2Fg%2F11fzf9rby8!5m1!1e1?entry=ttu&g_ep=EgoyMDI1MDYxMC4xIKXMDSoASAFQAw%3D%3D",
                        "_blank"
                      )
                    }
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Ver en Google Maps
                  </Button>
                </motion.div>
              </div>
            </section>

            {/* RSVP Form */}
            <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  className="text-center mb-16"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-script text-slate-600 mb-4">
                    Confirma tu Asistencia
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-slate-400 to-blue-500 mx-auto mb-8" />
                  <p className="text-gray-600 text-lg">
                    Tu presencia hará este día aún más especial
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="name"
                            className="text-gray-700 font-medium"
                          >
                            Nombre completo *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="border-slate-200 focus:border-slate-400"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="text-gray-700 font-medium"
                          >
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="border-slate-200 focus:border-slate-400"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="phone"
                            className="text-gray-700 font-medium"
                          >
                            Teléfono
                          </Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="border-slate-200 focus:border-slate-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="guests"
                            className="text-gray-700 font-medium"
                          >
                            Número de invitados
                          </Label>
                          <select
                            id="guests"
                            value={formData.guests}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                guests: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:border-slate-400 focus:outline-none"
                          >
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-gray-700 font-medium">
                          ¿Confirmas tu asistencia? *
                        </Label>
                        <div className="flex gap-4">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="attendance"
                              value="yes"
                              checked={formData.attendance === "yes"}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  attendance: e.target.value,
                                })
                              }
                              className="text-slate-500"
                            />
                            <span className="text-gray-700">Sí, asistiré</span>
                          </label>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="attendance"
                              value="no"
                              checked={formData.attendance === "no"}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  attendance: e.target.value,
                                })
                              }
                              className="text-slate-500"
                            />
                            <span className="text-gray-700">
                              No podré asistir
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="message"
                          className="text-gray-700 font-medium"
                        >
                          Mensaje especial (opcional)
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="border-slate-200 focus:border-slate-400"
                          rows={3}
                          placeholder="Deja un mensaje especial para Morena..."
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-slate-500 to-blue-600 hover:from-slate-600 hover:to-blue-700 text-white py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Check className="w-5 h-5 mr-2" />
                          Confirmar Asistencia
                        </Button>
                      </motion.div>
                    </form>
                  </Card>
                </motion.div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 bg-gradient-to-r from-slate-600 to-blue-700 text-white">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-script mb-4">
                    ¡Será una noche mágica!
                  </h3>
                  <p className="text-slate-100 mb-6">
                    Tu presencia es el mejor regalo que puedo recibir
                  </p>
                  <div className="flex space-x-6 text-slate-200 flex-col justify-center items-center">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      <span>Analia_marquez@outlook.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      <span>11 6887-7323</span>
                    </div>
                  </div>
                  <div className="mt-8 text-slate-200 text-sm">
                    Con amor, Morena ♡
                  </div>
                </motion.div>
              </div>
            </footer>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
