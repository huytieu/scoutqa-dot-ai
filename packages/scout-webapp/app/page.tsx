"use client";

import { Chat } from "@/components/copilotkit/chat";
import {
  LiveViewIframe,
  ToolCallManagerProvider,
} from "@/components/copilotkit/tool-call";

export default function Home() {
  return (
    <ToolCallManagerProvider>
      <div className="font-sans h-full">
        <main className="flex h-full">
          <div className="flex h-full w-1/3 flex-col border-r border-gray-200">
            <section className="border-b border-gray-200 px-4 py-3">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Profile
              </h2>
              <nav className="mt-2 flex flex-col gap-1 text-sm">
                <a
                  href="/settings/project"
                  className="text-gray-700 transition-colors hover:text-gray-900"
                >
                  Project settings
                </a>
                <a
                  href="https://docs.scoutqa.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 transition-colors hover:text-gray-900"
                >
                  Docs
                </a>
              </nav>
            </section>
            <Chat />
          </div>
          <div className="flex-1">
            <LiveViewIframe />
          </div>
        </main>
      </div>
    </ToolCallManagerProvider>
  );
}
