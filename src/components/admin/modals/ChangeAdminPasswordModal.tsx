
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { adminAuthService } from "@/services/adminAuth";

interface ChangeAdminPasswordModalProps {
  open: boolean;
  onClose: () => void;
  adminEmail: string;
}

const ChangeAdminPasswordModal = ({
  open,
  onClose,
  adminEmail,
}: ChangeAdminPasswordModalProps) => {
  const { toast } = useToast();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!oldPassword || !newPassword) {
      setError("Please fill both fields.");
      return;
    }
    setIsLoading(true);
    try {
      const { error: err } = await adminAuthService.changePassword(
        adminEmail,
        oldPassword,
        newPassword
      );
      if (err) {
        setError(err);
        return;
      }
      toast({ title: "Password changed successfully" });
      setOldPassword("");
      setNewPassword("");
      onClose();
    } catch (e: any) {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handlePasswordChange} className="space-y-4 mt-2">
          <Input
            type="password"
            placeholder="Current password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeAdminPasswordModal;
