export const assertCreatedFileWithEmptyContent = (projectsFile: string) => {
  it('should create the new file with empty content', () => {
    expect(projectsFile).toHaveBeenCreated(
      JSON.stringify({
        projects: [],
      }),
    );
  });
};
