let loading = false;

export const toggleLoading = (state?: boolean): void => {
  if (state != undefined) {
    loading = state;
  } else {
    loading = !loading;
  }

  if (loading) {
    showLoadingIndicator();
  } else {
    hideLoadingIndicator();
  }
};

const showLoadingIndicator = (): void => {
  const loadingElement = document.getElementById("loading-indicator");
  if (loadingElement) {
    loadingElement.style.display = "block";
  }
};

const hideLoadingIndicator = (): void => {
  const loadingElement = document.getElementById("loading-indicator");
  if (loadingElement) {
    loadingElement.style.display = "none";
  }
};
