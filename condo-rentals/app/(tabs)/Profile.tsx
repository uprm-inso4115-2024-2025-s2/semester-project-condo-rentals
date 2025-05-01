// app/(tabs)/Profile.tsx
// Perfil + edición de Bio SIN autenticación
// Lee / escribe la primera fila de la tabla `profiles` ─ paso intermedio
// ────────────────────────────────────────────────────────────────────
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { supabase } from "../../backend/supabaseClient";   // ← ajusta si tu ruta difiere

// ───────────────────────────
// Helpers (sin auth)
// ───────────────────────────
async function fetchDummyProfile() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, bio")
    .limit(1)
    .single();

  if (error) throw error;
  return data as { id: string; first_name: string; last_name: string; bio: string | null };
}

async function updateBio(id: string, bio: string) {
  const { error } = await supabase.from("profiles").update({ bio }).eq("id", id);
  if (error) throw error;
}

// ───────────────────────────
// 1. EditBioModal
// ───────────────────────────
function EditBioModal({
  initialBio,
  onSave,
  onCancel,
  saving,
}: {
  initialBio: string;
  onSave: (b: string) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [draft, setDraft] = useState(initialBio);
  const [err, setErr] = useState<string | null>(null);

  const handleSave = () => {
    if (!draft.trim()) return setErr("La bio no puede estar vacía");
    onSave(draft.trim());
  };

  return (
    <Modal visible transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.modalCard}>
          <TextInput
            style={styles.input}
            placeholder="Escribe algo sobre ti (máx 200 caracteres)…"
            value={draft}
            onChangeText={(t) => {
              setErr(null);
              setDraft(t);
            }}
            maxLength={200}
            multiline
          />
          <Text style={styles.counter}>{draft.length}/200</Text>
          {err && <Text style={styles.err}>{err}</Text>}

          <View style={styles.row}>
            <Pressable style={styles.cancelBtn} onPress={onCancel} disabled={saving}>
              <Text>Cancelar</Text>
            </Pressable>
            <Pressable style={styles.saveBtn} onPress={handleSave} disabled={saving}>
              {saving ? <ActivityIndicator /> : <Text>Guardar</Text>}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ───────────────────────────
// 2. BioSection
// ───────────────────────────
function BioSection({
  bio,
  onSaveBio,
}: {
  bio: string;
  onSaveBio: (b: string) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  return (
    <View style={styles.bioCard}>
      <Text style={styles.bioText}>{bio || "Aún sin biografía. Pulsa Editar."}</Text>

      <Pressable style={styles.editBtn} onPress={() => setOpen(true)}>
        <Text style={styles.editTxt}>Edit Bio</Text>
      </Pressable>

      {open && (
        <EditBioModal
          initialBio={bio}
          saving={saving}
          onCancel={() => setOpen(false)}
          onSave={async (newBio) => {
            setSaving(true);
            try {
              await onSaveBio(newBio);
              setOpen(false);
            } catch (e) {
              console.error(e);
            } finally {
              setSaving(false);
            }
          }}
        />
      )}
    </View>
  );
}

// ───────────────────────────
// 3. Pantalla Profile / Listings
// ───────────────────────────
export default function Listings() {
  const router = useRouter();
  const [profile, setProfile] = useState<
    | { id: string; first_name: string; last_name: string; bio: string | null }
    | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDummyProfile()
      .then(setProfile)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (!profile) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Botón Go Back */}
        <View style={styles.headerButton}>
          <TouchableOpacity onPress={() => router.push("/Landing")} style={styles.goBackButton}>
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>

        {/* Header con imagen + bio en fila */}
        <View style={styles.profileHeader}>
          {/* Imagen cuadrada */}
          <Image
            source={require("../../assets/images/profilePic.png")}
            style={styles.profileImage}
          />

          {/* Nombre + bio */}
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.profileName}>Alex Rodriguez</Text>
            <BioSection
              bio={profile.bio ?? ""}
              onSaveBio={async (newBio) => {
                await updateBio(profile.id, newBio);
                setProfile({ ...profile, bio: newBio });
              }}
            />
          </View>
        </View>

        {/* Lista de Rentals */}
        <View style={styles.rentalsContainer}>
          <Text style={styles.rentalsHeader}>My Properties/Rentals</Text>

          {[
            { icon: require("../../assets/images/house.png"), address: "Calle Rosado, San Juan", type: "House", owned: false },
            { icon: require("../../assets/images/house.png"), address: "456 Ocean Ave, Ponce", type: "House", owned: true },
            { icon: require("../../assets/images/apartment.png"), address: "789 Blv Emeterio, Mayagüez", type: "Apartment", owned: false },
            { icon: require("../../assets/images/apartment.png"), address: "101 Metro Plaza, Bayamón", type: "Apartment", owned: true },
            { icon: require("../../assets/images/house.png"), address: "Avenida Florinda, Caguas", type: "House", owned: false },
            { icon: require("../../assets/images/house.png"), address: "303 Villa Cordero, Humacao", type: "House", owned: true },
            { icon: require("../../assets/images/apartment.png"), address: "404 Valley View, Arecibo", type: "Apartment", owned: false },
            { icon: require("../../assets/images/apartment.png"), address: "505 Capital St, San Juan", type: "Apartment", owned: true },
          ].map((rental, index) => (
            <View key={index} style={styles.rentalCard}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={rental.icon} style={styles.rentalIcon} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>{rental.address}</Text>
                  <Text style={{ fontSize: 12, color: "#555" }}>
                    {rental.type} · {rental.owned ? "Owned" : "Rental"}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ───────────────────────────
// 4. Estilos
// ───────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  headerButton: { width: "25%", alignItems: "center", flexDirection: "row" },
  goBackButton: {
    backgroundColor: "#1565C0",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  goBackButtonText: { color: "#FFFFFF", fontWeight: "bold" },

  headerLogo: { width: "100%", alignItems: "center", justifyContent: "center" },
  logoContainer: { width: 50, height: 95, overflow: "hidden", marginBottom: 20 },
  logo: {
    width: 125,
    height: 125,
    marginTop: -20,
    marginLeft: -37,
    resizeMode: "cover",
  },

  textContainer: { padding: 70, justifyContent: "center", alignItems: "center" },

  bioCard: {
    marginHorizontal: 24,
    marginTop: 16,
    padding: 16,
    backgroundColor: "#C1E0FF",
    borderRadius: 12,
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 70, // make it rounder
    backgroundColor: "#e5e7eb",
    resizeMode: "cover",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  rentalsContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  rentalsHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  rentalCard: {
    padding: 10,
    backgroundColor: "#C1E0FF",
    borderRadius: 10,
    marginBottom: 10,
  },

  rentalIcon: {
    width: 50,
    height: 36,
    borderRadius: 10,
    resizeMode: "contain",
  },

  bioText: { fontSize: 16, marginBottom: 12 },
  editBtn: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#2563EB",
    borderRadius: 8,
  },
  editTxt: { color: "white", fontWeight: "500" },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
  },
  input: {
    minHeight: 100,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 12,
    textAlignVertical: "top",
  },
  counter: { alignSelf: "flex-end", marginTop: 4, color: "#6b7280" },
  err: { color: "#DC2626", marginTop: 8 },

  row: { flexDirection: "row", justifyContent: "flex-end", marginTop: 16, gap: 12 },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
  },
  saveBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#2563EB",
    borderRadius: 8,
  },
});
