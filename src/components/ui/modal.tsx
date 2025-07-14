import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import * as React from "react";

const Modal = ({
    open,
    onOpenChange,
    size,
    children,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}) => (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <ModalPortal>
            <ModalOverlay />
            <ModalContent size={size}>{children}</ModalContent>
        </ModalPortal>
    </Dialog.Root>
);

const ModalTrigger = Dialog.Trigger;

const ModalPortal = ({ children, ...props }: Dialog.DialogPortalProps) => (
    <Dialog.Portal {...props}>
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
            {children}
        </div>
    </Dialog.Portal>
)
ModalPortal.displayName = Dialog.Portal.displayName

const ModalOverlay = React.forwardRef<
    React.ElementRef<typeof Dialog.Overlay>,
    React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
    <Dialog.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
))
ModalOverlay.displayName = Dialog.Overlay.displayName

const ModalContent = React.forwardRef<
    React.ElementRef<typeof Dialog.Content>,
    React.ComponentPropsWithoutRef<typeof Dialog.Content> & { size?: "sm" | "md" | "lg" }
>(({ className, children, size, ...props }, ref) => (
    <ModalPortal>
        <ModalOverlay />
        <Dialog.Content
            ref={ref}
            className={cn(
                "fixed z-50 grid w-full gap-4 rounded-b-lg border bg-background p-6 shadow-lg animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-full sm:max-w-lg sm:rounded-lg sm:zoom-in-100 data-[state=open]:sm:slide-in-from-bottom-0",
                "dark:bg-slate-950 dark:text-slate-50",
                size === "sm" && "sm:max-w-sm",
                size === "md" && "sm:max-w-md",
                size === "lg" && "sm:max-w-2xl",
                className
            )}
            {...props}
        >
            {children}
        </Dialog.Content>
    </ModalPortal>
))
ModalContent.displayName = Dialog.Content.displayName

const ModalHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
)
ModalHeader.displayName = "ModalHeader"

const ModalFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
)
ModalFooter.displayName = "ModalFooter"

const ModalTitle = React.forwardRef<
    React.ElementRef<typeof Dialog.Title>,
    React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
    <Dialog.Title
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
ModalTitle.displayName = Dialog.Title.displayName

const ModalDescription = React.forwardRef<
    React.ElementRef<typeof Dialog.Description>,
    React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
    <Dialog.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
ModalDescription.displayName = Dialog.Description.displayName

export { Modal, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle, ModalTrigger };

