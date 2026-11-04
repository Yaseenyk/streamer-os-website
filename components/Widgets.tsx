'use client';

import { PreRegisterModal } from '@/components/PreRegisterDialog';
import SupportChatbot from '@/components/SupportChatbot';

// The single deferred chunk: see components/DeferredWidgets.tsx.
export default function Widgets({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      <PreRegisterModal isOpen={isOpen} onClose={onClose} />
      <SupportChatbot />
    </>
  );
}
